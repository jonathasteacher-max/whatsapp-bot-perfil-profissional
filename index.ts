import express, { Express } from 'express';
import { setupRoutes } from '../routes';
import { createLogger } from '../config/logger';

const logger = createLogger('App');

/**
 * Cria e configura aplicação Express
 */
export function createApp(): Express {
  const app = express();

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging de requisições
  app.use((req, _res, next) => {
    logger.debug('Requisição HTTP', {
      method: req.method,
      path: req.path,
      ip: req.ip,
    });
    next();
  });

  // Rotas
  app.use('/api', setupRoutes());

  // Rota raiz
  app.get('/', (_req, res) => {
    res.json({
      name: 'WhatsApp Bot - Perfil Profissional',
      version: '1.0.0',
      status: 'running',
      endpoints: {
        health: '/api/health',
        webhook: '/api/webhook/messages',
      },
    });
  });

  // Handler de erros
  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error('Erro não tratado', { error: err.message, stack: err.stack });
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  });

  return app;
}
