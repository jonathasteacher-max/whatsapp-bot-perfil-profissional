/**
 * Interface do provedor WhatsApp
 * Abstrai a comunicação com WhatsApp permitindo trocar implementação
 */
export interface IWhatsAppProvider {
  /**
   * Envia mensagem de texto simples
   */
  sendText(to: string, message: string): Promise<void>;

  /**
   * Envia menu formatado
   */
  sendMenu(to: string, message: string, options: string[]): Promise<void>;

  /**
   * Envia botões interativos
   */
  sendButtons(to: string, message: string, buttons: string[]): Promise<void>;

  /**
   * Envia lista de opções
   */
  sendList(to: string, message: string, title: string, items: string[]): Promise<void>;

  /**
   * Registra handler para mensagens recebidas
   */
  onMessage(handler: (from: string, message: string, messageId: string, contactName?: string) => Promise<void>): void;

  /**
   * Inicializa conexão com WhatsApp
   */
  connect(): Promise<void>;

  /**
   * Desconecta do WhatsApp
   */
  disconnect(): Promise<void>;

  /**
   * Verifica se está conectado
   */
  isConnected(): boolean;
}
