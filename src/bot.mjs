import TeleBot from "telebot"

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)

bot.on("text", msg => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const text = msg.text;
    let banStatus = false;
    const banWords = ["#stop_lgbt","гет","я не такий","☝️АЛЬХАМДУЛІЛЯХ☝️🕉️☪️","я нормальний","я не гей","я не ґей"];
    const username = msg.from.username;
    if(username!=="Artemis_Vainshtein"){
        for(let i = 0; i<banWords.length;i++){
            if(text.includes(banWords[i])){
                banStatus = true;
            }else if(text.includes("stop") && text.includes("lg")){
                banStatus = true;
            }else if(text.includes("стоп") && text.includes("лг")){
                banStatus = true;
            };
        };
    }
    return banStatus ? bot.deleteMessage(chatId, messageId) : null;
})

export default bot
