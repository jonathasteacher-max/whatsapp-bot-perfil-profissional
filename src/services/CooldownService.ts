import fs from 'fs';
import path from 'path';
import { createLogger } from '../config/logger';

const logger = createLogger('CooldownService');

/**
 * Serviço para controlar cooldown de respostas
 * Garante que cada contato receba apenas 1 resposta por dia
 */
export class CooldownService {
  private cooldownFilePath: string;
  private cooldownData: Map<string, string> = new Map();

  constructor() {
    this.cooldownFilePath = path.join(process.cwd(), 'contacts-cooldown.json');
    this.loadCooldownData();
  }

  /**
   * Carrega dados de cooldown do arquivo
   */
  private loadCooldownData(): void {
    try {
      if (fs.existsSync(this.cooldownFilePath)) {
        const data = fs.readFileSync(this.cooldownFilePath, 'utf-8');
        const parsed = JSON.parse(data);
        this.cooldownData = new Map(Object.entries(parsed));
        logger.info('Dados de cooldown carregados', { contacts: this.cooldownData.size });
      }
    } catch (error) {
      logger.error('Erro ao carregar dados de cooldown', { error });
      this.cooldownData = new Map();
    }
  }

  /**
   * Salva dados de cooldown no arquivo
   */
  private saveCooldownData(): void {
    try {
      const obj = Object.fromEntries(this.cooldownData);
      fs.writeFileSync(this.cooldownFilePath, JSON.stringify(obj, null, 2));
      logger.debug('Dados de cooldown salvos');
    } catch (error) {
      logger.error('Erro ao salvar dados de cooldown', { error });
    }
  }

  /**
   * Verifica se é o primeiro contato (nunca interagiu antes)
   */
  isFirstContact(contactId: string): boolean {
    return !this.cooldownData.has(contactId);
  }

  /**
   * Verifica se pode responder ao contato
   * Retorna true se pode responder (passou 24h desde última interação)
   */
  canRespond(contactId: string): boolean {
    const today = this.getTodayDate();
    const lastInteraction = this.cooldownData.get(contactId);

    if (!lastInteraction) {
      // Primeira vez que interage - pode responder
      logger.info('Primeiro contato do usuário', { contactId });
      return true;
    }

    if (lastInteraction !== today) {
      // Passou pelo menos 1 dia - pode responder
      logger.info('Cooldown expirado, pode responder novamente', { 
        contactId, 
        lastInteraction, 
        today 
      });
      return true;
    }

    // Ainda no mesmo dia - não pode responder
    logger.info('Cooldown ativo, ignorando mensagem', { 
      contactId, 
      lastInteraction 
    });
    return false;
  }

  /**
   * Marca que já teve primeiro contato mas SEM ativar cooldown
   * Usa data de ontem para permitir respostas hoje
   */
  markFirstContactDone(contactId: string): void {
    const yesterday = this.getYesterdayDate();
    this.cooldownData.set(contactId, yesterday);
    this.saveCooldownData();
    logger.debug('Primeiro contato marcado (sem cooldown)', { contactId, date: yesterday });
  }

  /**
   * Registra interação com contato (ativa cooldown)
   */
  registerInteraction(contactId: string): void {
    const today = this.getTodayDate();
    this.cooldownData.set(contactId, today);
    this.saveCooldownData();
    logger.debug('Interação registrada', { contactId, date: today });
  }

  /**
   * Retorna data de ontem no formato YYYY-MM-DD
   */
  private getYesterdayDate(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  }

  /**
   * Retorna data de hoje no formato YYYY-MM-DD
   */
  private getTodayDate(): string {
    const now = new Date();
    return now.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  /**
   * Limpa registros antigos (mais de 7 dias)
   * Útil para não acumular dados infinitamente
   */
  cleanOldRecords(): void {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const cutoffDate = sevenDaysAgo.toISOString().split('T')[0];

    let removed = 0;
    for (const [contactId, lastDate] of this.cooldownData.entries()) {
      if (lastDate < cutoffDate) {
        this.cooldownData.delete(contactId);
        removed++;
      }
    }

    if (removed > 0) {
      this.saveCooldownData();
      logger.info('Registros antigos removidos', { removed });
    }
  }

  /**
   * Reseta cooldown de um contato específico (para testes)
   */
  resetContact(contactId: string): void {
    this.cooldownData.delete(contactId);
    this.saveCooldownData();
    logger.info('Cooldown resetado para contato', { contactId });
  }

  /**
   * Limpa todos os dados de cooldown
   */
  clearAll(): void {
    this.cooldownData.clear();
    this.saveCooldownData();
    logger.info('Todos os dados de cooldown limpos');
  }
}
