import dotenv from 'dotenv';
import { z } from 'zod';

// Carrega variáveis de ambiente
dotenv.config();

/**
 * Schema de validação das variáveis de ambiente
 */
const envSchema = z.object({
  // Servidor
  PORT: z.string().default('3000'),
  HOST: z.string().default('0.0.0.0'),
  NODE_ENV: z.enum(['development', 'production']).default('development'),

  // WhatsApp
  WHATSAPP_SESSION_PATH: z.string().default('./auth_info_baileys'),
  WHATSAPP_USE_PAIRING_CODE: z.string().optional().default('false'),
  WHATSAPP_PAIRING_NUMBER: z.string().optional(),

  // Logs
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),

  // Perfil
  PROFILE_NAME: z.string().min(1, 'Nome do perfil é obrigatório'),
  PROFILE_TITLE: z.string().min(1, 'Título do perfil é obrigatório'),
  PROFILE_CITY: z.string().min(1, 'Cidade é obrigatória'),
  PROFILE_LINKEDIN: z.string().url('LinkedIn deve ser uma URL válida'),
  PROFILE_EMAIL: z.string().email('Email inválido'),
  PROFILE_WHATSAPP: z.string().min(10, 'WhatsApp inválido'),
});

/**
 * Variáveis de ambiente validadas
 */
export const env = envSchema.parse(process.env);

/**
 * Configurações do servidor
 */
export const serverConfig = {
  port: parseInt(env.PORT, 10),
  host: env.HOST,
  isProduction: env.NODE_ENV === 'production',
  isDevelopment: env.NODE_ENV === 'development',
};

export const whatsappConfig = {
  sessionPath: env.WHATSAPP_SESSION_PATH,
  usePairingCode: env.WHATSAPP_USE_PAIRING_CODE === 'true',
  pairingNumber: env.WHATSAPP_PAIRING_NUMBER,
};
