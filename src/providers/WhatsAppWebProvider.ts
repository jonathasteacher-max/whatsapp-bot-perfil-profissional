import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  WASocket,
  proto,
  isJidBroadcast,
  isJidStatusBroadcast,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import qrcode from 'qrcode-terminal';
import { IWhatsAppProvider } from './IWhatsAppProvider';
import { createLogger } from '../config/logger';
import { env, whatsappConfig } from '../config/environment';
import pino from 'pino';

const logger = createLogger('WhatsAppProvider');

/**
 * Implementação do provider WhatsApp usando Baileys
 */
export class WhatsAppWebProvider implements IWhatsAppProvider {
  private sock: WASocket | null = null;
  private messageHandler: ((from: string, message: string, messageId: string, contactName?: string) => Promise<void>) | null = null;
  private connectionState: 'disconnected' | 'connecting' | 'connected' = 'disconnected';

  private async wait(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async requestPairingCodeWithRetry(phoneNumber: string, maxAttempts = 3): Promise<string> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        if (!this.sock) {
          throw new Error('Socket do WhatsApp ainda não está disponível');
        }

        if (attempt === 1) {
          await this.wait(5000);
        } else {
          await this.wait(3000 * attempt);
        }

        logger.info({ attempt, maxAttempts }, 'Solicitando codigo de pareamento');
        return await this.sock.requestPairingCode(phoneNumber);
      } catch (error) {
        lastError = error;
        const normalizedError = error instanceof Error
          ? { name: error.name, message: error.message, stack: error.stack }
          : { message: String(error) };

        logger.warn(
          { attempt, maxAttempts, error: normalizedError },
          'Falha ao solicitar codigo de pareamento'
        );
        logger.warn(`Falha ao solicitar codigo de pareamento (tentativa ${attempt}/${maxAttempts}): ${normalizedError.message}`);
      }
    }

    throw lastError instanceof Error
      ? lastError
      : new Error(String(lastError ?? 'Falha desconhecida ao solicitar codigo de pareamento'));
  }

  /**
   * Conecta ao WhatsApp
   */
  async connect(): Promise<void> {
    try {
      logger.info('Inicializando WhatsApp Web Provider...');
      this.connectionState = 'connecting';

      const { state, saveCreds } = await useMultiFileAuthState(env.WHATSAPP_SESSION_PATH);
      const { version } = await fetchLatestBaileysVersion();
      const baileysLogger = pino({ level: 'fatal' });
      const usePairingCode = whatsappConfig.usePairingCode;

      logger.info(
        {
          sessionPath: env.WHATSAPP_SESSION_PATH,
          usePairingCode,
          hasPairingNumber: Boolean(whatsappConfig.pairingNumber),
        },
        'Configuracao de autenticacao do WhatsApp carregada'
      );
      logger.info(
        `Configuracao de autenticacao do WhatsApp carregada | sessionPath=${env.WHATSAPP_SESSION_PATH} | usePairingCode=${usePairingCode} | hasPairingNumber=${Boolean(whatsappConfig.pairingNumber)}`
      );

      this.sock = makeWASocket({
        version,
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, baileysLogger as any),
        },
        printQRInTerminal: !usePairingCode,
        logger: baileysLogger as any,
      });

      if (usePairingCode && !this.sock.authState.creds.registered) {
        if (!whatsappConfig.pairingNumber) {
          throw new Error('WHATSAPP_PAIRING_NUMBER é obrigatório quando WHATSAPP_USE_PAIRING_CODE=true');
        }

        logger.info(`Solicitando codigo de pareamento para o numero ${whatsappConfig.pairingNumber}`);
        const code = await this.requestPairingCodeWithRetry(whatsappConfig.pairingNumber);
        logger.info(
          { pairingCode: code, pairingNumber: whatsappConfig.pairingNumber },
          'Codigo de pareamento gerado. No WhatsApp: Aparelhos conectados > Conectar com numero de telefone'
        );
        logger.info(`Codigo de pareamento gerado: ${code}`);
      }

      // Salvar credenciais quando atualizadas
      this.sock.ev.on('creds.update', saveCreds);

      // Gerenciar conexão
      this.sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr && !usePairingCode) {
          logger.info('QR Code gerado. Escaneie com seu WhatsApp:');
          qrcode.generate(qr, { small: false });
        }

        if (connection === 'close') {
          const shouldReconnect =
            (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

          logger.warn(
            {
              shouldReconnect,
              statusCode: (lastDisconnect?.error as Boom)?.output?.statusCode,
            },
            'Conexão fechada'
          );

          this.connectionState = 'disconnected';

          if (shouldReconnect) {
            logger.info('Reconectando...');
            await this.connect();
          } else {
            logger.error('Desconectado. Favor autenticar novamente.');
          }
        } else if (connection === 'open') {
          this.connectionState = 'connected';
          logger.info('✅ WhatsApp conectado com sucesso!');
        }
      });

      // Salva credenciais quando atualizadas
      this.sock.ev.on('creds.update', saveCreds);

      // Handler de mensagens
      this.sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;

        for (const msg of messages) {
          await this.handleIncomingMessage(msg);
        }
      });

      logger.info('WhatsApp Provider configurado. Aguardando conexão...');
    } catch (error) {
      const normalizedError = error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack }
        : { message: String(error) };

      logger.error({ error: normalizedError }, 'Erro ao conectar WhatsApp');
      logger.error(`Erro ao conectar WhatsApp: ${normalizedError.message}`);
      if (normalizedError.stack) {
        logger.error(normalizedError.stack);
      }
      this.connectionState = 'disconnected';
      throw error;
    }
  }

  /**
   * Processa mensagem recebida
   */
  private async handleIncomingMessage(msg: proto.IWebMessageInfo): Promise<void> {
    try {
      // Ignora mensagens próprias e broadcasts
      if (msg.key.fromMe) return;
      if (!msg.key.remoteJid) return;
      if (isJidBroadcast(msg.key.remoteJid)) return;
      if (isJidStatusBroadcast(msg.key.remoteJid)) return;

      const from = msg.key.remoteJid;

      // IGNORA MENSAGENS DE GRUPOS - Só responde em conversas privadas
      if (from.endsWith('@g.us')) {
        logger.info('Mensagem de grupo ignorada', { from });
        return;
      }

      // Extrai nome do contato (pushName) ou usa o número
      const contactName = msg.pushName || from.split('@')[0];

      const messageText =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        msg.message?.imageMessage?.caption ||
        '';

      if (!messageText) return;

      const messageId = msg.key.id || '';

      logger.info('Mensagem recebida', { from, contactName, message: messageText });

      // Chama handler registrado com nome do contato
      if (this.messageHandler) {
        await this.messageHandler(from, messageText.trim(), messageId, contactName);
      }
    } catch (error) {
      logger.error({ error, msg }, 'Erro ao processar mensagem');
    }
  }

  /**
   * Envia mensagem de texto
   */
  async sendText(to: string, message: string): Promise<void> {
    if (!this.sock) {
      throw new Error('WhatsApp não conectado');
    }

    try {
      await this.sock.sendMessage(to, { text: message });
      logger.debug('Mensagem enviada', { to, message });
    } catch (error) {
      logger.error({ error, to }, 'Erro ao enviar mensagem');
      throw error;
    }
  }

  /**
   * Envia menu formatado (usando texto formatado)
   */
  async sendMenu(to: string, message: string, options: string[]): Promise<void> {
    const formattedMenu = `${message}\n\n${options.join('\n')}`;
    await this.sendText(to, formattedMenu);
  }

  /**
   * Envia botões (fallback para texto no Baileys)
   */
  async sendButtons(to: string, message: string, buttons: string[]): Promise<void> {
    const formattedButtons = `${message}\n\n${buttons.map((btn, idx) => `${idx + 1}. ${btn}`).join('\n')}`;
    await this.sendText(to, formattedButtons);
  }

  /**
   * Envia lista (fallback para texto no Baileys)
   */
  async sendList(to: string, message: string, title: string, items: string[]): Promise<void> {
    const formattedList = `${message}\n\n*${title}*\n${items.map((item, idx) => `${idx + 1}. ${item}`).join('\n')}`;
    await this.sendText(to, formattedList);
  }

  /**
   * Registra handler para mensagens recebidas
   */
  onMessage(handler: (from: string, message: string, messageId: string, contactName?: string) => Promise<void>): void {
    this.messageHandler = handler;
    logger.debug('Handler de mensagens registrado');
  }

  /**
   * Desconecta do WhatsApp
   */
  async disconnect(): Promise<void> {
    if (this.sock) {
      await this.sock.logout();
      this.sock = null;
      this.connectionState = 'disconnected';
      logger.info('Desconectado do WhatsApp');
    }
  }

  /**
   * Verifica se está conectado
   */
  isConnected(): boolean {
    return this.connectionState === 'connected';
  }
}
