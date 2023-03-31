const TelegramApi = require('node-telegram-bot-api')
const { Configuration, OpenAIApi } = require('openai')
require('dotenv').config()

const TOKEN_TELEGRAM = process.env.TOKEN_TELEGRAM
const API_KEY_OPENAI = process.env.API_KEY_OPENAI

const bot = new TelegramApi(TOKEN_TELEGRAM, { polling: true })
const configuration = new Configuration({
   apiKey: API_KEY_OPENAI,
})
const openai = new OpenAIApi(configuration)

const messages = []

bot.on('message', async msg => {
   const chatId = msg.chat.id
   const message = msg.text

   messages.push({ role: 'user', content: message })

   try {
      const completion = await openai.createChatCompletion({
         model: 'gpt-3.5-turbo',
         messages: messages,
      })
      bot.sendMessage(chatId, completion.data.choices[0].message.content.trim())
   }
   
   catch (err) {
      bot.sendMessage(chatId, `Ошибка( sorry`)
   }
})
