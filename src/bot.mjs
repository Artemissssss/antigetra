import TeleBot from "telebot"

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

bot.on("text", msg => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const text = msg.text;
    let banStatus = false;
    const banWords = ["#stop_lgbt_propaganda"];
    for(let i = 0; i<banWords.length;i++){
        if(text.includes(banWords[i])){
            banStatus = true;
            
        };
    };
    banStatus ? bot.deleteMessage(chatId, messageId) : null;
})

export default bot
