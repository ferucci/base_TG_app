// Инициализирую бота, который будет помогать с реферальной системой

import { Telegraf, Markup } from 'telegraf'

import dotenv from 'dotenv'
dotenv.config();

const token = process.env.JWT_TOKEN
const webAppUrl = process.env.APP_URL
const bot = new Telegraf(token)

bot.command('start', (context) => {
  context.reply('Привет! Нажмите кнопку Start для запуска', Markup.inlineKeyboard([
    Markup.button.webApp(
      'Open mini app',
      `${webAppUrl}?ref=${context.payload}`
    )
  ]))
})

bot.launch()