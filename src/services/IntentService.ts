import { createLogger } from '../config/logger';
import { Intent } from '../types';

const logger = createLogger('IntentService');

/**
 * Mapeamento de palavras-chave para intenções
 */
const INTENT_KEYWORDS: Record<string, string[]> = {
  dynamics: ['dynamics', 'dynamics 365', 'd365', 'crm'],
  model_driven: ['model driven', 'model-driven', 'mda', 'app model'],
  plugin: ['plugin', 'plugins', 'c#', 'csharp', 'backend'],
  javascript: ['javascript', 'js', 'client', 'client-side', 'form'],
  business_rules: ['business rule', 'business rules', 'regra', 'regras', 'workflow'],
  power_platform: ['power platform', 'pp'],
  power_apps: ['power apps', 'powerapps', 'canvas', 'canvas app'],
  power_automate: ['power automate', 'flow', 'automação', 'automacao'],
  copilot: ['copilot', 'copilot studio', 'bot', 'chatbot', 'virtual agent'],
  ia: ['ia', 'ai', 'inteligencia artificial', 'artificial intelligence', 'ia generativa', 'generative ai', 'machine learning', 'ml'],
  dataverse: ['dataverse', 'cds', 'common data service'],
  api: ['api', 'rest', 'integração', 'integracao', 'webapi'],
  integration: ['integração', 'integracao', 'integration', 'integrar'],
  project: ['projeto', 'project', 'projetos'],
  opportunity: ['oportunidade', 'opportunity', 'oportunidades'],
  job: ['vaga', 'job', 'emprego', 'trabalho', 'posição' , 'posicao'],
  consultancy: ['consultoria', 'consulting', 'consultor'],
  contact: ['contato', 'contact', 'falar', 'conversar'],
  profile: ['perfil', 'profile', 'sobre', 'about', 'quem'],
  skills: ['especialidade', 'especialidades', 'skills', 'habilidade', 'competência', 'competencia'],
};

/**
 * Serviço para identificação de intenções do usuário
 */
export class IntentService {
  /**
   * Identifica intenção baseada no texto da mensagem
   */
  identifyIntent(message: string): Intent {
    const normalizedMessage = this.normalizeText(message);

    for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
      for (const keyword of keywords) {
        if (normalizedMessage.includes(this.normalizeText(keyword))) {
          logger.debug('Intenção identificada', { intent, keyword, message });
          return intent as Intent;
        }
      }
    }

    logger.debug('Nenhuma intenção específica identificada', { message });
    return null;
  }

  /**
   * Verifica se é saudação
   */
  isGreeting(message: string): boolean {
    const greetings = ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'hey', 'opa', 'olaa'];
    const normalized = this.normalizeText(message);
    
    return greetings.some(greeting => normalized === this.normalizeText(greeting) || normalized.startsWith(greeting + ' '));
  }

  /**
   * Verifica se é opção de menu (1-5)
   */
  isMenuOption(message: string): string | null {
    const normalized = message.trim();
    const match = normalized.match(/^([1-5])[️⃣\s]?/);
    
    if (match) {
      return match[1];
    }
    
    return null;
  }

  /**
   * Normaliza texto para comparação
   */
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^\w\s]/g, ' ') // Remove pontuação
      .replace(/\s+/g, ' '); // Normaliza espaços
  }
}
