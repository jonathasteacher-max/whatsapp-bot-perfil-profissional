import { Router } from 'express';
import { HealthController } from '../controllers/HealthController';
import { WebhookController } from '../controllers/WebhookController';

/**
 * Configura todas as rotas da aplicação
 */
export function setupRoutes(): Router {
  const router = Router();
  
  const healthController = new HealthController();
  const webhookController = new WebhookController();

  // Health check
  router.get('/health', (req, res) => healthController.check(req, res));

  // Webhook
  router.post('/webhook/messages', (req, res) => webhookController.handleMessage(req, res));

  return router;
}
