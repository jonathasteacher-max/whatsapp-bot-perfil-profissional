import { IWhatsAppProvider } from '../providers/IWhatsAppProvider';
import { IntentService } from './IntentService';
import { CooldownService } from './CooldownService';
import { ConversationState, MenuOption } from '../types';
import { createLogger } from '../config/logger';
import { botMessages, mainMenuOptions } from '../config/profile';

const logger = createLogger('BotService');

/**
 * Serviço principal do bot
 * Orquestra fluxos conversacionais e envia respostas
 */
export class BotService {
  private intentService: IntentService;
  private cooldownService: CooldownService;
  private conversationStates: Map<string, ConversationState> = new Map();

  constructor(private whatsappProvider: IWhatsAppProvider) {
    this.intentService = new IntentService();
    this.cooldownService = new CooldownService();
    
    // Limpa registros antigos a cada 24h
    setInterval(() => {
      this.cooldownService.cleanOldRecords();
    }, 24 * 60 * 60 * 1000); // 24 horas
  }

  /**
   * Inicializa o bot
   */
  async start(): Promise<void> {
    try {
      logger.info('Iniciando Bot Service...');

      // Registra handler de mensagens
      this.whatsappProvider.onMessage(async (from, message, _messageId, contactName) => {
        await this.handleMessage(from, message, contactName);
      });

      logger.info('Bot Service iniciado com sucesso');
    } catch (error) {
      logger.error('Erro ao iniciar Bot Service', { error });
      throw error;
    }
  }

  /**
   * Processa mensagem recebida
   */
  private async handleMessage(from: string, message: string, contactName?: string): Promise<void> {
    try {
      logger.info('Processando mensagem', { from, message, contactName });

      const currentState = this.conversationStates.get(from) || ConversationState.IDLE;
      const normalizedMessage = message.toLowerCase().trim();
      const isFirstContact = this.cooldownService.isFirstContact(from);

      // 🌟 PRIMEIRO CONTATO - Sempre envia boas-vindas personalizadas
      if (isFirstContact) {
        logger.info('Primeiro contato detectado - enviando boas-vindas', { from, contactName });
        await this.sendWelcome(from, contactName);
        await this.showMainMenu(from);
        this.conversationStates.set(from, ConversationState.MAIN_MENU);
        
        // ✅ MARCA PRIMEIRO CONTATO (sem ativar cooldown - permite respostas hoje)
        this.cooldownService.markFirstContactDone(from);
        return;
      }

      // ✅ OPÇÕES DE MENU (1-5) - SEMPRE RESPONDEM (ignoram cooldown)
      const menuOption = this.intentService.isMenuOption(message);
      if (menuOption) {
        await this.handleMenuOption(from, menuOption);
        return; // NÃO ativa cooldown - permite navegação livre pelo menu
      }

      // ⚠️ VERIFICA COOLDOWN - Para textos livres, saudações, etc
      if (!this.cooldownService.canRespond(from)) {
        logger.info('Ignorando mensagem devido ao cooldown', { from });
        return;
      }

      // Comando global: MENU
      if (normalizedMessage === 'menu' || normalizedMessage === 'voltar' || normalizedMessage === 'inicio') {
        await this.showMainMenu(from);
        this.conversationStates.set(from, ConversationState.MAIN_MENU);
        return;
      }

      // Verifica se é saudação inicial
      if (this.intentService.isGreeting(message) && currentState === ConversationState.IDLE) {
        await this.sendWelcome(from, contactName);
        await this.showMainMenu(from);
        this.conversationStates.set(from, ConversationState.MAIN_MENU);
        
        // ✅ REGISTRA INTERAÇÃO - Ativa cooldown de 24h
        this.cooldownService.registerInteraction(from);
        return;
      }

      // Identifica intenção
      const intent = this.intentService.identifyIntent(message);
      if (intent) {
        await this.handleIntent(from, intent);
        // ✅ REGISTRA INTERAÇÃO - Ativa cooldown de 24h
        this.cooldownService.registerInteraction(from);
        return;
      }

      // Fallback - Ativa cooldown pois pessoa mandou texto livre
      await this.showFallback(from);
      this.cooldownService.registerInteraction(from);
    } catch (error) {
      logger.error('Erro ao processar mensagem', { error, from, message });
      await this.whatsappProvider.sendText(
        from,
        'Desculpe, ocorreu um erro. Por favor, tente novamente ou digite *MENU*.'
      );
    }
  }

  /**
   * Envia mensagem de boas-vindas personalizada
   */
  private async sendWelcome(from: string, contactName?: string): Promise<void> {
    // Personaliza saudação com nome do contato
    let welcomeMessage = botMessages.welcome;
    
    if (contactName) {
      // Adiciona o nome no início da mensagem
      welcomeMessage = `Olá, *${contactName}*! 👋\n\n` + 
        welcomeMessage.replace('Olá! 👋\n\n', '');
    }
    
    await this.whatsappProvider.sendText(from, welcomeMessage);
  }

  /**
   * Mostra menu principal
   */
  private async showMainMenu(from: string): Promise<void> {
    const menuText = mainMenuOptions.join('\n');
    await this.whatsappProvider.sendText(from, menuText);
    this.conversationStates.set(from, ConversationState.MAIN_MENU);
  }

  /**
   * Processa opção do menu
   */
  private async handleMenuOption(from: string, option: string): Promise<void> {
    switch (option) {
      case MenuOption.PROFILE:
        await this.whatsappProvider.sendText(from, botMessages.profile);
        await this.showMainMenu(from);
        break;

      case MenuOption.SKILLS:
        await this.whatsappProvider.sendText(from, botMessages.skills);
        await this.showMainMenu(from);
        break;

      case MenuOption.OPPORTUNITIES:
        await this.whatsappProvider.sendText(from, botMessages.opportunities);
        await this.showMainMenu(from);
        break;

      case MenuOption.CONTACT:
        await this.whatsappProvider.sendText(from, botMessages.contact);
        this.conversationStates.set(from, ConversationState.DIRECT_CONTACT);
        break;

      case MenuOption.OTHER:
        await this.whatsappProvider.sendText(from, botMessages.other);
        this.conversationStates.set(from, ConversationState.OTHER_SUBJECTS);
        break;

      default:
        await this.whatsappProvider.sendText(from, botMessages.invalidOption);
        await this.showMainMenu(from);
    }
  }

  /**
   * Processa intenção identificada
   */
  private async handleIntent(from: string, intent: string): Promise<void> {
    switch (intent) {
      case 'profile':
        await this.whatsappProvider.sendText(from, botMessages.profile);
        await this.showMainMenu(from);
        break;

      case 'skills':
      case 'dynamics':
      case 'model_driven':
      case 'plugin':
      case 'javascript':
      case 'business_rules':
      case 'power_platform':
      case 'power_apps':
      case 'power_automate':
      case 'dataverse':
      case 'api':
      case 'integration':
        await this.whatsappProvider.sendText(from, botMessages.skills);
        await this.showMainMenu(from);
        break;

      case 'opportunity':
      case 'job':
      case 'project':
      case 'consultancy':
        await this.whatsappProvider.sendText(from, botMessages.opportunities);
        await this.showMainMenu(from);
        break;

      case 'contact':
        await this.whatsappProvider.sendText(from, botMessages.contact);
        this.conversationStates.set(from, ConversationState.DIRECT_CONTACT);
        break;

      default:
        await this.showFallback(from);
    }
  }

  /**
   * Mostra mensagem de fallback
   */
  private async showFallback(from: string): Promise<void> {
    await this.whatsappProvider.sendText(from, botMessages.fallback);
    await this.showMainMenu(from);
  }
}
