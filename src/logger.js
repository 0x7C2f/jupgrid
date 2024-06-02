import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const userID = process.env.TELEGRAM_USER_ID;

// Create a bot instance
const bot = new TelegramBot(token);

const logger = {
  log: function(message) {
    console.log(`${message}`); // Log info message to console

    // Check if Telegram bot token and chat ID are configured
    if (token && userID) {
      // Send message to Telegram
      bot.sendMessage(userID, `${message}`)
        .catch((error) => console.error("Error sending message to Telegram:", error));
    }
  }
};

export default logger;
