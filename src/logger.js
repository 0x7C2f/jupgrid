import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_USER_ID;

// Create a bot instance
const bot = new TelegramBot(token);

const logger = {
  info: function(message) {
    console.log(`[INFO] ${message}`); // Log info message to console

    // Check if Telegram bot token and chat ID are configured
    if (token && chatId) {
      // Send message to Telegram
      bot.sendMessage(chatId, `[INFO] ${message}`)
        .catch((error) => console.error("Error sending message to Telegram:", error));
    }
  },

  debug: function(message) {
    if (process.env.DEBUG === 'true') {
      console.log(`[DEBUG] ${message}`); // Log debug message to console
    }
  }
};

export default logger;
