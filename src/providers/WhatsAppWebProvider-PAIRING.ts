import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  WASocket,
  proto,
  isJidBroadcast,
  isJidStatusBroadcast,
  makeCacheableSignalKeyStore,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import readline from 'readline';
import { IWhatsAppProvider } from './IWhatsAppProvider';
import { createLogger } from '../config/logger';
import { env } from '../config/environment';

const logger = createLogger('WhatsAppProvider');

/**
 * Implementação do provider WhatsApp usando Baileys - VERSÃO COM PAIRING CODE
 */
export class WhatsAppWebProvider implements IWhatsAppProvider {
  private sock: WASocket | null = null;
  private connectionState: 'disconnected' | 'connecting' | 'connected' = 'disconnected';

  /**
   * Conecta ao WhatsApp usando PAIRING CODE
   */
  async connect(): Promise<void> {
    try {
      logger.info('Inicializando WhatsApp Web Provider (PAIRING CODE)...');
      this.connectionState = 'connecting';

      // Gerencia autenticação multi-arquivo
      const { state, saveCreds } = await useMultiFileAuthState(env.WHATSAPP_SESSION_PATH);

      // Logger silencioso para Baileys
      const baileysLogger = pino({ level: 'fatal' });

      // Cria socket WhatsApp
      this.sock = makeWASocket({
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, baileysLogger as any),
        },
        logger: baileysLogger as any,
        printQRInTerminal: false,
        browser: ['Bot WhatsApp', 'Chrome', '1.0.0'],
      });

      // Se não estiver logado, solicita pairing code
      if (!this.sock.authState.creds.registered) {
        console.clear();
        console.log('\n');
        console.log('════════════════════════════════════════════════════════════');
        console.log('  📱 CONECTAR WHATSAPP VIA CÓDIGO DE PAREAMENTO');
        console.log('════════════════════════════════════════════════════════════');
        console.log('\n');

        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        const phoneNumber = await new Promise<string>((resolve) => {
          rl.question('Digite seu número WhatsApp (com DDI, ex: 5511999999999): ', (answer) => {
            rl.close();
            resolve(answer.trim());
          });
        });

        console.log('\n⏳ Solicitando código de pareamento...\n');

        const code = await this.sock.requestPairingCode(phoneNumber);

        console.log('\n');
        console.log('════════════════════════════════════════════════════════════');
        console.log('  ✨ SEU CÓDIGO DE PAREAMENTO:');
        console.log('');
        console.log(`     ${code}`);
        console.log('');
        console.log('════════════════════════════════════════════════════════════');
        console.log('\n');
        console.log('📱 No seu celular WhatsApp:');
        console.log('   1. Abra WhatsApp');
        console.log('   2. Vá em Configurações → Aparelhos conectados');
        console.log('   3. Toque em "Conectar um aparelho"');
        console.log('   4. Toque em "Conectar com número de telefone"');
        console.log(`   5. Digite o código: ${code}`);
        console.log('\n');
        console.log('⏳ Aguardando pareamento...');
        console.log('\n');
      }

      // Handler de credenciais
      this.sock.ev.on('creds.update', saveCreds);

      // Handler de atualização de conexão
      this.sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
          const statusCode = (lastDisconnect?.error as Boom)?.output?.statusCode;
          
          console.log('\n⚠️  Conexão fechada - Status:', statusCode);

          this.connectionState = 'disconnected';

          if (statusCode === DisconnectReason.loggedOut) {
            console.log('❌ Você foi desconectado. Reinicie o bot para gerar novo código.');
            return;
          }

          console.log('🔄 Reconectando em 5 segundos...');
          await new Promise(resolve => setTimeout(resolve, 5000));
          await this.connect();
        } else if (connection === 'open') {
          console.clear();
          console.log('\n');
          console.log('════════════════════════════════════════════════════════════');
          console.log('  ✅ CONECTADO AO WHATSAPP COM SUCESSO!');
          console.log('════════════════════════════════════════════════════════════');
          console.log('\n');
          console.log('🤖 Bot está ONLINE e pronto para receber mensagens!');
          console.log('\n');
          console.log('📱 Envie "oi" de outro número para testar');
          console.log('\n');
          this.connectionState = 'connected';
        }
      });

      // Handler de mensagens
      this.sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;

        for (const msg of messages) {
          if (!msg.message) continue;
          if (msg.key.fromMe) continue;
          if (isJidBroadcast(msg.key.remoteJid || '')) continue;
          if (isJidStatusBroadcast(msg.key.remoteJid || '')) continue;

          const from = msg.key.remoteJid || '';
          const messageText =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            '';

          if (this.messageHandler) {
            await this.messageHandler(from, messageText);
          }
        }
      });

      logger.info('WhatsApp Provider configurado com sucesso!');
    } catch (error) {
      logger.error('Erro ao conectar ao WhatsApp', error);
      this.connectionState = 'disconnected';
      throw error;
    }
  }

  private messageHandler?: (from: string, message: string) => Promise<void>;

  async onMessage(handler: (from: string, message: string) => Promise<void>): Promise<void> {
    this.messageHandler = handler;
  }

  async sendText(to: string, text: string): Promise<void> {
    if (!this.sock) throw new Error('WhatsApp não está conectado');
    await this.sock.sendMessage(to, { text });
  }

  async sendMenu(to: string, header: string, body: string, footer: string, buttons: { id: string; text: string }[]): Promise<void> {
    if (!this.sock) throw new Error('WhatsApp não está conectado');

    const buttonMessages = buttons.map((btn, index) => ({
      buttonId: btn.id,
      buttonText: { displayText: btn.text },
      type: 1,
    }));

    await this.sock.sendMessage(to, {
      text: `*${header}*\n\n${body}\n\n_${footer}_`,
    });
  }

  async sendButtons(to: string, text: string, buttons: { id: string; text: string }[]): Promise<void> {
    await this.sendText(to, text);
  }

  async sendList(to: string, header: string, body: string, buttonText: string, sections: any[]): Promise<void> {
    await this.sendText(to, `*${header}*\n\n${body}`);
  }

  async disconnect(): Promise<void> {
    if (this.sock) {
      await this.sock.logout();
      this.sock = null;
    }
    this.connectionState = 'disconnected';
  }

  isConnected(): boolean {
    return this.connectionState === 'connected';
  }
}
