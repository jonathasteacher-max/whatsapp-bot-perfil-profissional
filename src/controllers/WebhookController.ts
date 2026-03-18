import { Request, Response } from 'express';
import { createLogger } from '../config/logger';

const logger = createLogger('WebhookController');

/**
 * Controller para webhook de mensagens
 * (Pode ser expandido para integrações futuras)
 */
export class WebhookController {
  /**
   * POST /webhook/messages
   * Recebe mensagens externas (se necessário)
   */
  async handleMessage(req: Request, res: Response): Promise<void> {
    try {
      const { from, message } = req.body;

      logger.info('Webhook recebido', { from, message });

      // Aqui poderia processar mensagens de APIs externas
      // Por ora, apenas loga e retorna sucesso

      res.status(200).json({
        success: true,
        message: 'Mensagem recebida',
      });
    } catch (error) {
      logger.error('Erro no webhook', { error });
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }
}
