import { env } from './environment';
import { ProfileConfig } from '../types';

/**
 * Configuração do perfil profissional
 */
export const profileConfig: ProfileConfig = {
  name: env.PROFILE_NAME,
  title: env.PROFILE_TITLE,
  city: env.PROFILE_CITY,
  linkedin: env.PROFILE_LINKEDIN,
  email: env.PROFILE_EMAIL,
  whatsapp: env.PROFILE_WHATSAPP,
};

/**
 * Mensagens do bot
 */
export const botMessages = {
  /**
   * Mensagem de boas-vindas
   */
  welcome: `Olá! 👋

Sou *Jonathas Severino*, Desenvolvedor Sênior com foco em *Dynamics 365 e Power Platform*, com experiência na construção, customização e evolução de soluções corporativas no ecossistema Microsoft.

Estruturei este contato para apresentar de forma objetiva meu perfil técnico, minhas principais especialidades e como posso apoiar oportunidades e projetos.

Como deseja seguir?`,

  /**
   * Perfil profissional
   */
  profile: `Sou *Jonathas Severino*, Desenvolvedor Sênior com foco em *Dynamics 365 e Power Platform*, participando da construção, customização e evolução de soluções corporativas.

Minha atuação é mais concentrada em cenários que exigem profundidade técnica, estruturação de soluções, sustentação evolutiva e integração entre sistemas, especialmente em ambientes Microsoft.`,

  /**
   * Especialidades técnicas
   */
  skills: `Minha atuação técnica está concentrada principalmente em:

✅ *Dynamics 365 CE*
✅ *Model-Driven Apps*
✅ *Power Apps* (Canvas e Model-Driven)
✅ *Power Automate*
✅ *Copilot Studio* e customização de copilots
✅ *IA Generativa* aplicada a soluções empresariais
✅ *Plugins e extensões em C#*
✅ *JavaScript* para customizações client-side
✅ *Business Rules* e automações de processo
✅ *Dataverse*
✅ *Integrações com APIs REST*

Costumo atuar em cenários que exigem personalização avançada, evolução de soluções, automação inteligente e melhoria contínua de ambientes corporativos.`,

  /**
   * Oportunidades
   */
  opportunities: `Atualmente, estou aberto a conversar sobre *oportunidades, projetos e iniciativas* alinhados ao meu perfil técnico, especialmente em contextos envolvendo *Dynamics 365*, *Power Platform* e evolução de soluções corporativas.

Tenho maior aderência a cenários que exigem boa estruturação técnica, qualidade de entrega e visão de longo prazo.`,

  /**
   * Contato direto
   */
  contact: `Perfeito.

Se fizer sentido para sua necessidade, fique à vontade para falar comigo por aqui.

Posso conversar sobre:

• oportunidades profissionais
• projetos
• consultoria técnica
• evolução de soluções Microsoft

Será um prazer entender melhor o contexto.`,

  /**
   * Outros assuntos
   */
  other: `Sem problema.

Se o assunto não estiver nas opções principais, pode me escrever por aqui que eu respondo assim que possível.`,

  /**
   * Fallback quando não entende
   */
  fallback: `Posso te apresentar meu perfil, minhas especialidades, falar sobre oportunidades e projetos ou seguir direto para conversa por aqui.

Escolha uma opção para continuar.`,

  /**
   * Menu inválido
   */
  invalidOption: `Opção inválida.

Por favor, escolha uma opção de *1 a 5* do menu, ou digite sua mensagem diretamente.`,
};

/**
 * Opções do menu principal
 */
export const mainMenuOptions = [
  '1️⃣ 👨‍💻 Sobre meu perfil',
  '2️⃣ ⚙️ Especialidades em Dynamics e Power Platform',
  '3️⃣ 🚀 Oportunidades e projetos',
  '4️⃣ 💬 Falar comigo',
  '5️⃣ ❓ Outros assuntos',
];
