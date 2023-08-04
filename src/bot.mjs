import TeleBot from "telebot"
// const openai = require('openai');
// const { MongoClient } = require('mongodb');
import { Configuration,OpenAIApi } from 'openai';
import { MongoClient } from 'mongodb';
const openaiClient = new OpenAIApi(process.env.OPENAI_API_KEY);
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)
function cyrillicToLatin(text) {
    let cyrillic = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    let latin = 'abvgdeejzijklmnoprstufhzcss_y_eua';
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let index = cyrillic.indexOf(text[i].toLowerCase());
        if (index >= 0) {
            result += text[i] === text[i].toUpperCase() ? latin[index].toUpperCase() : latin[index];
        } else {
            result += text[i];
        }
    }
    return result;
}

async function moderateText(text) {
    try {
        // Зробіть запит до OpenAI API
        const response = await openaiClient.moderation.classify({
            prompt: text
        });
        return response;
    } catch (error) {
        console.error(error);
        throw error; // Переслати помилку, щоб обробити її вище
    }
}
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

bot.on("text", async msg => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const text = cyrillicToLatin((msg.text).toLowerCase())
    .replace(/@/i, 'a').replace(/à/i, 'a').replace(/á/i, 'a').replace(/â/i, 'a').replace(/ã/i, 'a').replace(/ä/i, 'a').replace(/å/i, 'a').replace(/æ/i, 'a')
    .replace(/ç/i, 'c').replace(/è/i, 'e').replace(/é/i, 'e').replace(/ê/i, 'e').replace(/ë/i, 'e').replace(/ì/i, 'i').replace(/í/i, 'i').replace(/î/i, 'i')
    .replace(/ð/i, 'o').replace(/л/i, 'l').replace(/ö/i, 'o').replace(/ô/i, 'o').replace(/ò/i, 'o').replace(/ó/i, 'o').replace(/ł/i, 'l').replace(/ñ/i, 'n')
    .replace(/ń/i, 'n').replace(/0/i, 'o').replace(/é/i, 'e').replace(/ê/i, 'e').replace(/ë/i, 'e').replace(/ì/i, 'i').replace(/í/i, 'i').replace(/î/i, 'i')
    const text1 = (msg.text).toLowerCase();
    let banStatus = false;
    const banWords = ["#stop_lgbt","гет","я не такий","альх","я нормальний","я не гей","я не ґей","get","het","гет"];
    const username = msg.from.username;
    if(username!=="Artemis_Vainshtein"){
        for(let i = 0; i<banWords.length;i++){
            if(text.includes(banWords[i]) || text1.includes(banWords[i]) || msg.text.includes(banWords[i])){
                banStatus = true;
                break;
            }else if(text.includes("st") && text.includes("lg") && !text.includes("stu")){
                banStatus = true;
                break;
            }else if(text.includes("ст") && (text.includes("лг") || text.includes("лґ"))){
                banStatus = true;
                break;
            }else if(text.includes("ні") && text.includes("лг")){
                banStatus = true;
                break;
            }else if(text.includes("no") && text.includes("lg")){
                banStatus = true;
                break;
            }else if(`${msg.from.id}` === "5558411571" || `${msg.from.id}` === "5551509960"){
                if(text.includes("natural")){
                    banStatus = true;
                    break;
                }
                const client = await MongoClient.connect(
                    `mongodb+srv://${process.env.NEXT_PUBLIC_DATABASE_USER}:${process.env.NEXT_PUBLIC_DATABASE_PASSWORD}@${process.env.NEXT_PUBLIC_DATABASE}/?retryWrites=true&w=majority`,
                    { useNewUrlParser: true, useUnifiedTopology: true }
                );
                const coll = client.db('banwords').collection('lgbtqplus');
                const cursor = coll.find();
                const result = await cursor.toArray();
                await client.close();
                for(let i = 0; i<result.length;i++){
                    if(text.includes(result[i].text) || text1.includes(result[i].text)){
                        banStatus = true;
                        break;
                    };
                };
                // if(!banStatus){
                //     // await openai.createModeration({
                //     //     input: text,
                //     //   }).then(response => {
                //     //     if(response.results[0].categories.hate || response.results[0].categories.hate/threatening || response.results[0].categories.harassment || response.results[0].categories.violence || response.results[0].categories.violence/graphic){
                //     //         banStatus = true;
                //     //     }
                //     // });
                //     // await delay(1000);
                //     // await openai.createModeration({
                //     //     input: text1,
                //     //   }).then(response => {
                //     //     if(response.results[0].categories.hate || response.results[0].categories.hate/threatening || response.results[0].categories.harassment || response.results[0].categories.violence || response.results[0].categories.violence/graphic){
                //     //         banStatus = true;
                //     //     }
                //     // });
                //     if(banStatus){break}
            
                // }
            }
        };
    }
    return banStatus ? bot.deleteMessage(chatId, messageId) : null;
});




bot.on(['/add'], async (msg) => {
    const username = msg.from.username;
    const replyToDelete = msg.reply_to_message;
    const text = replyToDelete.text 
    if(username!=="Artemis_Vainshtein"){
        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.NEXT_PUBLIC_DATABASE_USER}:${process.env.NEXT_PUBLIC_DATABASE_PASSWORD}@${process.env.NEXT_PUBLIC_DATABASE}/?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const coll = client.db('banwords').collection('lgbtqplus');
        const result = await coll.insertOne({text:text})
        await client.close();
        bot.deleteMessage(msg.chat.id, replyToDelete.message_id);
        return msg.reply.text("Додано")
    }else{
        return msg.reply.text("Безправний")
    }
});

bot.on(['/start'], async (msg) => {
    const promptText = "You need check are there in next text lgbt hate and is here something write good about heterodexual. Text:'Lgbt is okay, hetero is bad', you must return if here is good about lgbt and good about heterosexual 'true false', if bad about lgbt and bad about heterosexual then answer 'false true'";
    const data = { prompt: promptText, temperature: 0.7 };
    
    // Змініть URL на ваш фактичний URL API
    const apiUrl = "https://this-is-api.run-eu-central1.goorm.site/gpt";
    
    // Збільште тайм-аут, якщо це необхідно
    const timeoutMs = 15000; // 15 секунд
    let result;
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const responseData = await response.json();
        console.dir(responseData.text);
        result = responseData.text;
      })
      .catch((error) => {
        console.error("Error occurred:", error.message);
      });

      return msg.reply.text(result)
});

export default bot

