import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class NotifyService implements OnModuleInit {
  private bot: Telegraf;
  // Твой ID чата (узнай у @userinfobot) или ID группы
  private readonly chatId = process.env.TELEGRAM_CHAT_ID; 

  onModuleInit() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (token) {
      this.bot = new Telegraf(token);
      console.log('✅ Telegram Bot initialized');
    }
  }

  async sendAlert(monitorName: string, url: string, error: string) {
    const chatId = process.env.TELEGRAM_CHAT_ID;
  
    // Если токен или chatId не заданы, просто выходим
    if (!this.bot || !chatId) {
      console.warn('Telegram Bot или Chat ID не настроены в .env');
      return;
    }
  
    const message = 
      `🔴 <b>ВНИМАНИЕ: РЕСУРС НЕДОСТУПЕН</b>\n\n` +
      `<b>Имя:</b> ${monitorName}\n` +
      `<b>URL:</b> ${url}\n` +
      `<b>Ошибка:</b> <code>${error}</code>`;
  
    try {
      // Теперь TypeScript спокоен, так как мы проверили chatId выше
      await this.bot.telegram.sendMessage(chatId, message, { parse_mode: 'HTML' });
    } catch (err) {
      console.error('Ошибка отправки в Telegram:', err);
    }
  }

  async sendRecovery(monitorName: string, url: string) {
    if (!this.bot) return;
    const chatId = process.env.TELEGRAM_CHAT_ID;
  
    // Если токен или chatId не заданы, просто выходим
    if (!this.bot || !chatId) {
      console.warn('Telegram Bot или Chat ID не настроены в .env');
      return;
    }
    const message = 
      `🟢 <b>РЕСУРС СНОВА В СЕТИ</b>\n\n` +
      `<b>Имя:</b> ${monitorName}\n` +
      `<b>URL:</b> ${url}\n` +
      `<b>Статус:</b> Восстановлен`;

    try {
      await this.bot.telegram.sendMessage(chatId, message, { parse_mode: 'HTML' });
    } catch (err) {
      console.error('Ошибка отправки в Telegram:', err);
    }
  }
}