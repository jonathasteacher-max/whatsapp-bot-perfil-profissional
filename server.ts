import { createApp } from './app';
import { WhatsAppWebProvider } from './providers/WhatsAppWebProvider';
import { BotService } from './services/BotService';
import { serverConfig } from './config/environment';
import { createLogger } from './config/logger';

const logger = createLogger('Server');

/**
 * Inicializa servidor e bot
 */
async function bootstrap() {
  try {
    logger.info('Iniciando aplicação...');

    // Cria aplicação Express
    const app = createApp();

    // Inicia servidor HTTP
    const server = app.listen(serverConfig.port, serverConfig.host, () => {
      logger.info(`🚀 Servidor rodando em http://${serverConfig.host}:${serverConfig.port}`);
      logger.info(`📡 Health check: http://${serverConfig.host}:${serverConfig.port}/api/health`);
    });

    // Cria provider WhatsApp
    const whatsappProvider = new WhatsAppWebProvider();

    // Cria bot service
    const botService = new BotService(whatsappProvider);

    // Conecta ao WhatsApp
    await whatsappProvider.connect();

    // Inicia bot
    await botService.start();

    logger.info('✅ Aplicação iniciada com sucesso!');
    logger.info('👉 Aguardando QR Code para conectar WhatsApp...');

    // Graceful shutdown
    const shutdown = async () => {
      logger.info('Encerrando aplicação...');
      
      await whatsappProvider.disconnect();
      
      server.close(() => {
        logger.info('Servidor HTTP encerrado');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (error) {
    logger.error({ error }, 'Erro fatal ao iniciar aplicação');
    process.exit(1);
  }
}

// Inicia aplicação
bootstrap();
