import { Request, Response } from 'express';
import { createLogger } from '../config/logger';

const logger = createLogger('HealthController');

/**
 * Controller para health check
 */
export class HealthController {
  /**
   * GET /health
   * Retorna status da aplicação
   */
  async check(_req: Request, res: Response): Promise<void> {
    try {
      const health = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
      };

      logger.debug('Health check realizado', health);
      res.status(200).json(health);
    } catch (error) {
      logger.error('Erro no health check', { error });
      res.status(500).json({
        status: 'unhealthy',
        error: 'Internal server error',
      });
    }
  }
}
