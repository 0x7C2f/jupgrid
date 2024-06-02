import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_USER_ID;

const logger = {
  log: function(message) {
    console.log(message); // Log to console

    // Check if Telegram bot token and chat ID are configured
    if (token && chatId) {
      // Create a bot instance
      const bot = new TelegramBot(token);

      // Send message to Telegram
      bot.sendMessage(chatId, message)
        .catch((error) => console.error("Error sending message to Telegram:", error));
    }
  }
};

export default logger;
