import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
const storage = {};

console.log();

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Hello! I am a weather bot", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Get Weather", callback_data: "get_weather" }],
        [{ text: "Get Time", callback_data: "get_time" }],
      ],
    },
  });
});