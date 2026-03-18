import pino from 'pino';

const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * Logger configurado com Pino
 */
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
});

/**
 * Cria logger com contexto específico
 */
export function createLogger(component: string) {
  return logger.child({ component });
}
