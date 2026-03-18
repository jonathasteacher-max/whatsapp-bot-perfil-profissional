/**
 * Estados da conversa no bot
 */
export enum ConversationState {
  IDLE = 'idle',
  MAIN_MENU = 'main_menu',
  VIEWING_PROFILE = 'viewing_profile',
  VIEWING_SKILLS = 'viewing_skills',
  VIEWING_OPPORTUNITIES = 'viewing_opportunities',
  DIRECT_CONTACT = 'direct_contact',
  OTHER_SUBJECTS = 'other_subjects',
}

/**
 * Opciones del menú principal
 */
export enum MenuOption {
  PROFILE = '1',
  SKILLS = '2',
  OPPORTUNITIES = '3',
  CONTACT = '4',
  OTHER = '5',
}

/**
 * Intenções identificadas do usuário
 */
export type Intent =
  | 'dynamics'
  | 'model_driven'
  | 'plugin'
  | 'javascript'
  | 'business_rules'
  | 'power_platform'
  | 'power_apps'
  | 'power_automate'
  | 'dataverse'
  | 'api'
  | 'integration'
  | 'project'
  | 'opportunity'
  | 'job'
  | 'consultancy'
  | 'contact'
  | 'profile'
  | 'skills'
  | null;

/**
 * Configuração do perfil profissional
 */
export interface ProfileConfig {
  name: string;
  title: string;
  city: string;
  linkedin: string;
  email: string;
  whatsapp: string;
}

/**
 * Mensagem recebida
 */
export interface IncomingMessage {
  from: string;
  message: string;
  messageId: string;
  timestamp: Date;
}

/**
 * Resposta do bot
 */
export interface BotResponse {
  to: string;
  message: string;
  type: 'text' | 'menu' | 'buttons' | 'list';
  options?: string[];
}
