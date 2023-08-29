import TeleBot from "telebot"

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)


export default async function handler(req, res) {
    for(let i  = 111000; i<111625; i++){
        console.log(await bot.forwardMessage(1052973544,-1001955166931,i));
    }
    res.status(200).json({ error: "Internal server error" });
}
