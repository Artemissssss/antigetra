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
    .replace(/./i, '').replace(/_/i, '').replace(/-/i, '').replace("(", '').replace(")", '')
    const text1 = (msg.text).toLowerCase();
    let banStatus = false;
    const banWords = ["#stop_lgbt","гет","я не такий","альх","я нормальний","я не гей","я не ґей","get","het","гет"];
    const username = msg.from.username;
    if(username!=="Artemis_Vainshtein"){
        for(let i = 0; i<banWords.length;i++){
            if((text.includes(banWords[i]) || text1.includes(banWords[i]) || msg.text.includes(banWords[i])) && !text.includes("гетьман") && !text1.includes("гетьман")){
                banStatus = true;
                break;
            }else if(text.includes("st") && text.includes("lg") && !text.includes("stu")){
                banStatus = true;
                break;
            }else if(text1.includes("ст") && (text1.includes("лг") || text.includes("лґ"))){
                banStatus = true;
                break;
            }else if(text1.includes("ні") && text1.includes("лг")){
                banStatus = true;
                break;
            }else if(text.includes("no") && text.includes("lg")){
                banStatus = true;
                break;
            }
        };
        if((`${msg.from.id}` === "5558411571" || `${msg.from.id}` === "5551509960" || `${msg.from.id}` === "1864697655") && !banStatus){
            if(text.includes("natural")){
                banStatus = true;
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
                };
            };
            if(!banStatus){
                // await openai.createModeration({
                //     input: text,
                //   }).then(response => {
                //     if(response.results[0].categories.hate || response.results[0].categories.hate/threatening || response.results[0].categories.harassment || response.results[0].categories.violence || response.results[0].categories.violence/graphic){
                //         banStatus = true;
                //     }
                // });
                // await delay(1000);
                // await openai.createModeration({
                //     input: text1,
                //   }).then(response => {
                //     if(response.results[0].categories.hate || response.results[0].categories.hate/threatening || response.results[0].categories.harassment || response.results[0].categories.violence || response.results[0].categories.violence/graphic){
                //         banStatus = true;
                //     }
                // });
                // const promptText = `You are provided with a specific text that discusses LGBT+ and heterosexual individuals. Your task is to analyze the text and determine the sentiment expressed towards LGBT+ and heterosexual individuals. Based on the text's portrayal, provide a concise response according to the following criteria:
                // If the text contains a positive or neutral portrayal of LGBT+ individuals and a negative portrayal of heterosexual individuals, return **false true**.
                // If the text contains a negative portrayal of LGBT+ individuals and a positive or neutral portrayal of heterosexual individuals, return **true false**.
                // If the text contains a positive or neutral portrayal of both LGBT+ and heterosexual individuals, return **false false**.
                // If the text contains a negative portrayal of both LGBT+ and heterosexual individuals, return **true true**.
                // If there is no mention of LGBT+ individuals but a negative portrayal of heterosexual individuals is present, return **null true**.
                // If there is no mention of LGBT+ individuals and a positive or neutral portrayal of heterosexual individuals is present, return **null false**.
                // If there is a positive or neutral portrayal of LGBT+ individuals but no mention of heterosexual individuals, return **false null**.
                // If there is a negative portrayal of LGBT+ individuals but no mention of heterosexual individuals, return **true null**.
                // If there is no mention of both LGBT+ and heterosexual individuals, return **null null**.
                // Provide a concise response solely based on the given text and the provided criteria. Text: '${msg.text}'
                // `;
                //     const data =  { prompt: promptText };
                    
                //     // Змініть URL на ваш фактичний URL API
                //     const apiUrl =  "https://this-is-api.run-eu-central1.goorm.site/gpt4-fake";
                    
                //     // Збільште тайм-аут, якщо це необхідно
                //     const timeoutMs =  15000; // 15 секунд
                    
                //     try {
                //         const response = await fetch(apiUrl, {
                //             method: 'POST',
                //             headers: {
                //                 'Content-Type': 'application/json'
                //             },
                //             timeout: timeoutMs,
                //             body: JSON.stringify(data),
                //         });
                
                //         if (response.ok) {
                //             const responseData = await response.json();
                //             const resultText = responseData.text;
                //             const arr = resultText.slice("true false".indexOf("true"),"true false".indexOf("false")+5).split(" ")
                //             if(arr[0] ==="true"){
                //                     banStatus=true;
                //             }else if(arr[0] === "false"){
                //                 if(arr[1]==="false"){
                //                     banStatus=true;
                //                     await msg.reply.text("ГЕТЕРО ПРОПАГАНДА ЗАБОРОНЕНА");
                //                 }
                //             }
                //         } else {
                //             console.error("Request failed with status:", response.status);
                //              await msg.reply.text("An error occurred while processing your request.");
                //         }
                //     } catch (error) {
                //         console.error("Error occurred:", error.message);
                //          await msg.reply.text("An error occurred while processing your request.");
                //     }
            }
        }
    }
    return banStatus ? bot.deleteMessage(chatId, messageId) : null;
});


//"true false".slice("true false".indexOf("true"),"true false".indexOf("false")+5)

bot.on(['/add'], async (msg,props) => {
    const username = msg.from.username;
    const replyToDelete = msg.reply_to_message;
    const text = replyToDelete.text 
    if(username==="Artemis_Vainshtein"){
        if(parseInt(props)){
            const client = await MongoClient.connect(
                `mongodb+srv://${process.env.NEXT_PUBLIC_DATABASE_USER}:${process.env.NEXT_PUBLIC_DATABASE_PASSWORD}@${process.env.NEXT_PUBLIC_DATABASE}/?retryWrites=true&w=majority`,
                { useNewUrlParser: true, useUnifiedTopology: true }
            );
            const coll = client.db('banwords').collection('lgbtqplus');
            const result = await coll.insertOne({text:text.slice(0,parseInt(props))})
            await client.close();
            bot.deleteMessage(msg.chat.id, replyToDelete.message_id);
            return msg.reply.text("Додано")
        }else{
            const client = await MongoClient.connect(
                `mongodb+srv://${process.env.NEXT_PUBLIC_DATABASE_USER}:${process.env.NEXT_PUBLIC_DATABASE_PASSWORD}@${process.env.NEXT_PUBLIC_DATABASE}/?retryWrites=true&w=majority`,
                { useNewUrlParser: true, useUnifiedTopology: true }
            );
            const coll = client.db('banwords').collection('lgbtqplus');
            const result = await coll.insertOne({text:text})
            await client.close();
            bot.deleteMessage(msg.chat.id, replyToDelete.message_id);
            return msg.reply.text("Додано")
        }
    }else{
        return msg.reply.text("Безправний")
    }
});

bot.on(/^\/ok (.+)$/, async (msg,props) => {
    const promptText = `You are provided with a specific text that discusses LGBT+ and heterosexual individuals. Your task is to analyze the text and determine the sentiment expressed towards LGBT+ and heterosexual individuals. Based on the text's portrayal, provide a concise response according to the following criteria:
    If there is no mention of LGBT+ individuals but a negative portrayal of heterosexual individuals is present, return **null true**.
If there is no mention of LGBT+ individuals and a positive or neutral portrayal of heterosexual individuals is present, return **null false**.
If there is a positive or neutral portrayal of LGBT+ individuals but no mention of heterosexual individuals, return **false null**.
If there is a negative portrayal of LGBT+ individuals but no mention of heterosexual individuals, return **true null**.
If there is no mention of both LGBT+ and heterosexual individuals, return **null null**.
If the text contains a positive or neutral portrayal of LGBT+ individuals and a negative portrayal of heterosexual individuals, return **false true**.
If the text contains a negative portrayal of LGBT+ individuals and a positive or neutral portrayal of heterosexual individuals, return **true false**.
If the text contains a positive or neutral portrayal of both LGBT+ and heterosexual individuals, return **false false**.
If the text contains a negative portrayal of both LGBT+ and heterosexual individuals, return **true true**.
Provide a concise response solely based on the given text and the provided criteria. Text: '${props.match[1]}'
`;
    const data =  { prompt: promptText };
    
    // Змініть URL на ваш фактичний URL API
    const apiUrl =  "https://this-is-api.run-eu-central1.goorm.site/gpt4-fake";
    
    // Збільште тайм-аут, якщо це необхідно
    const timeoutMs =  15000; // 15 секунд
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: timeoutMs,
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const responseData = await response.json();
            const resultText = responseData.text;
            return await msg.reply.text(resultText);
        } else {
            console.error("Request failed with status:", response.status);
            return await msg.reply.text("An error occurred while processing your request.");
        }
    } catch (error) {
        console.error("Error occurred:", error.message);
        return await msg.reply.text("An error occurred while processing your request.");
    }
});
bot.on(/^\/gpt4 (.+)$/, async (msg,props) => {
    const promptText = `${props.match[1]}`;
    const data =  { prompt: promptText };
    
    // Змініть URL на ваш фактичний URL API
    const apiUrl =  "https://this-is-api.run-eu-central1.goorm.site/gpt4-fake";
    const apiUrl2 =  "https://this-is-api.run-eu-central1.goorm.site/bard";
    // Збільште тайм-аут, якщо це необхідно
    const timeoutMs =  15000; // 15 секунд
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: timeoutMs,
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const responseData = await response.json();
            const resultText = responseData.text;
            return await msg.reply.text(resultText);
        } else {
            const response = await fetch(apiUrl2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: timeoutMs,
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const responseData = await response.json();
            const resultText = responseData.text;
            return await msg.reply.text(resultText);
        } else {
            console.error("Request failed with status:", response.status);
            return await msg.reply.text("An error occurred while processing your request.");
        }
            console.error("Request failed with status:", response.status);
            return await msg.reply.text("An error occurred while processing your request.");
        }
    } catch (error) {
        console.error("Error occurred:", error.message);
        return await msg.reply.text("An error occurred while processing your request.");
    }
});

export default bot

