const express = require('express');
const { Telegraf } = require('telegraf');
const { OpenAI } = require('openai');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('OK');
});

app.get('/status', (req, res) => {
    res.json({ status: 'OK' });
});


const TGBOT_TOKEN = process.env.TGBOT_TOKEN;
const OPENAI_KEY = process.env.OPENAI_KEY;

const bot = new Telegraf(TGBOT_TOKEN);
const openai = new OpenAI({
    apiKey: OPENAI_KEY
});

bot.on('message', async (ctx) => {
    console.log(`Message = [${ctx.message.text}]`);
    
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: 'user', content: ctx.message.text }
        ]
    });

    const replyMessage = completion.choices[0].message.content;

    ctx.reply(replyMessage);
});

bot.launch();


app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});