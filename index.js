const express = require('express');
const { Telegraf } = require('telegraf');

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

const bot = new Telegraf(TGBOT_TOKEN);

bot.on('message', (ctx) => {
    ctx.reply('HELLO');
});

bot.launch();


app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});