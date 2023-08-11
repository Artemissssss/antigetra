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
function latinToCyrillic(input) {
    const latinToCyrillicMap = {
      a: 'а',
      b: 'б',
      c: 'ц',
      d: 'д',
      e: 'е',
      f: 'ф',
      g: 'г',
      h: 'х',
      i: 'і',
      j: 'й',
      k: 'к',
      l: 'л',
      m: 'м',
      n: 'н',
      o: 'о',
      p: 'п',
      q: 'к',
      r: 'р',
      s: 'с',
      t: 'т',
      u: 'у',
      v: 'в',
      w: 'в',
      x: 'кс',
      y: 'и',
      z: 'з',
    };
  
    return input
      .split('')
      .map((char) => {
        const lowercaseChar = char.toLowerCase();
        return latinToCyrillicMap[lowercaseChar] || char;
      })
      .join('');
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
    .replace(/./i, '').replace(/_/i, '').replace(/-/i, '').replace("(", '').replace(")", '').split(" ").join("").replace(/ŋ/i, 'n').replace(/ŉ/i, 'n').replace(/ņ/i, 'n')
    .replace(/ġ/i, 'g').replace(/ĝ/i, 'g').replace(/ğ/i, 'g').replace(/ģ/i, 'g').replace(/ĥ/i, 'e')
    const text1 = latinToCyrillic((msg.text).toLowerCase().replace(/@/i, 'a').replace(/à/i, 'a').replace(/á/i, 'a').replace(/â/i, 'a').replace(/ã/i, 'a').replace(/ä/i, 'a').replace(/å/i, 'a').replace(/æ/i, 'a')
    .replace(/ç/i, 'c').replace(/è/i, 'e').replace(/é/i, 'e').replace(/ê/i, 'e').replace(/ë/i, 'e').replace(/ì/i, 'i').replace(/í/i, 'i').replace(/î/i, 'i')
    .replace(/ð/i, 'o').replace(/л/i, 'l').replace(/ö/i, 'o').replace(/ô/i, 'o').replace(/ò/i, 'o').replace(/ó/i, 'o').replace(/ł/i, 'l').replace(/ñ/i, 'n')
    .replace(/ń/i, 'n').replace(/0/i, 'o').replace(/é/i, 'e').replace(/ê/i, 'e').replace(/ë/i, 'e').replace(/ì/i, 'i').replace(/í/i, 'i').replace(/î/i, 'i')
    .replace(/./i, '').replace(/_/i, '').replace(/-/i, '').replace("(", '').replace(")", '').split(" ").join("").replace(/ŋ/i, 'n').replace(/ŉ/i, 'n').replace(/ņ/i, 'n').replace(/ġ/i, 'g').replace(/ĝ/i, 'g').replace(/ğ/i, 'g').replace(/ģ/i, 'g').replace(/ĥ/i, 'e'))
    .replace(/ґ/i, 'г').replace(/./i, '').replace(/_/i, '').replace(/-/i, '').replace("(", '').replace(")", '').split(" ").join("");
    let banStatus = false;
    const banWords = ["#stop_lgbt","гет","я не такий","альх","я нормальний","я не гей","я не ґей","get","het","гет","heterö","гетеро","Ґeт","Гѐтѐро̀","Гѐтеро̀","Слава гѐтѐро̀","Вічна слава гѐтѐро̀","Гѐтѐро̀","Гѐтѐро̀","Гѐтѐро̀","Гѐтѐро̀","hęt","Я ґetерo","Але не лгбт","ґетеро","/start привіт","st lg","Fhdb","gét","gęt","gėt","geŧ","/add","/block 1052973544 1024","/block 1052973544 -1","Стоп ЛГБТ","Ахахахахахахазазазазахахах","Ахахахахахахазазазазахахахх","клевета","/block 1052973544 5000","/gpt4 Як зупинити пропаганду лгбт","#зупіть_пропаганду_лгбт","#НІ_лівій_пропаганді","#say_no_js_say_yes_python","#27ліцей","#45ліцей","#stop_l_g_b_t","#ні_лівій_пропаганді","#no_🏳️‍🌈","#!лгбт","Я!лгбт","я!лгбт","Hęтеросексуальність - це основний ген","зупиніть пропаганду ґеїв","Я не гей, і ніколи ним не буду","Гетеро","Гетеро","Ґетеро","no🏳️‍🌈","noo🏳️‍🌈","nó🏳️‍🌈","nooo🏳️‍🌈","#депорошенізація","🏳️‍🌈no","ģēŧerо"];
    const username = msg.from.username;
    if(username!=="Artemis_Vainshtein" && msg.from.id !=="1647838471" && msg.from.id !=="833961178" && msg.from.id !=="1128434712" &&msg.from.id !=="888466576" && msg.from.id !=="752317094" && msg.from.id !=="628452250"){
        for(let i = 0; i<banWords.length;i++){
            if((text.includes(banWords[i]) || text1.includes(banWords[i]) || msg.text.includes(banWords[i])) && !text.includes("гетьман") && !text1.includes("гетьман")){
                banStatus = true;
                break;
            }else if(text.includes("st") && text.includes("lg")){
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
            }else if(text.includes("no") && (text.includes("🏳️‍🌈") || text.includes("🏳️‍⚧️"))){
                banStatus = true;
                break;
            }else if(text.includes("st") && (text.includes("🏳️‍🌈") || text.includes("🏳️‍⚧️"))){
                banStatus = true;
                break;
            }else if(text1.includes("ст") && (text1.includes("🏳️‍🌈") || text1.includes("🏳️‍⚧️"))){
                banStatus = true;
                break;
            }else if(text1.includes("ні") && (text1.includes("🏳️‍🌈") || text1.includes("🏳️‍⚧️"))){
                banStatus = true;
                break;
            }else if(text1.includes("слав") && text1.includes("гет")){
                banStatus = true;
                break;
            }else if(text.includes("glor") && (text.includes("het") || text.includes("get"))){
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
                if(text.includes(result[i].text.toLowerCase()) || text1.includes(result[i].text.toLowerCase()) || msg.text.includes(result[i].text.toLowerCase())){
                    banStatus = true;
                };
            };
            if(!banStatus){///moderations

                // const apiUrl =  "https://this-is-api.run-eu-central1.goorm.site/moderations";
                    
                // // Збільште тайм-аут, якщо це необхідно
                // const timeoutMs =  15000; // 15 секунд
                
                // try {
                //     const response = await fetch(apiUrl, {
                //         method: 'POST',
                //         headers: {
                //             'Content-Type': 'application/json'
                //         },
                //         timeout: timeoutMs,
                //         body: JSON.stringify({prompt:msg.text}),
                //     });
            
                //     if (response.ok) {
                //         if(response.results[0].categories.hate || response.results[0].categories.hate/threatening || response.results[0].categories.harassment || response.results[0].categories.violence || response.results[0].categories.violence/graphic){
                //             banStatus = true;
                //         }
                //     } else {
                //         console.error("Request failed with status:", response.status);
                //          await msg.reply.text("An error occurred while processing your request.");
                //     }
                // } catch (error) {
                //     console.error("Error occurred:", error.message);
                //      await msg.reply.text("An error occurred while processing your request.");
                // }

                if(!banStatus){
                    const promptText = `Text: '${msg.text}'
                `;

                        const data =  { prompt: promptText,temperature:0.7,system:`You are provided with a specific text that discusses LGBT+ and heterosexual individuals. Your task is to analyze the text and determine the sentiment expressed towards LGBT+ and heterosexual individuals. Based on the text's portrayal, provide a concise response according to the following criteria:
    If there is no mention of LGBT+ individuals but a negative portrayal of heterosexual individuals is present, return **null true**.
If there is no mention of LGBT+ individuals and a positive or neutral portrayal of heterosexual individuals is present, return **null false**.
If there is a positive or neutral portrayal of LGBT+ individuals but no mention of heterosexual individuals, return **false null**.
If there is a negative portrayal of LGBT+ individuals but no mention of heterosexual individuals, return **true null**.
If there is no mention of both LGBT+ and heterosexual individuals, return **null null**.
If the text contains a positive or neutral portrayal of LGBT+ individuals and a negative portrayal of heterosexual individuals, return **false true**.
If the text contains a negative portrayal of LGBT+ individuals and a positive or neutral portrayal of heterosexual individuals, return **true false**.
If the text contains a positive or neutral portrayal of both LGBT+ and heterosexual individuals, return **false false**.
If the text contains a negative portrayal of both LGBT+ and heterosexual individuals, return **true true**.
Example 1: heterosexuals are bad. Answer **null true**.
Example 2: heterosexuals are cool. Answer **null false**.
Example 3: gays cool. Answer **false null**.
Example 4: gays bad. Answer **true null**.
Example 5: hello. Answer **null null**.
Example 6: gays cool and heterosexuals are bad. Answer **false true**.
Example 7: gays bad and heterosexuals are cool. Answer **true false**.
Example 8: gays cool and heterosexuals are cool. Answer **false false**.
Example 9: gays bad and heterosexuals are bad. Answer **true true**.
Provide a concise response solely based on the given text and the provided criteria. Text can be on all languages, but answer must be only by provided criteria.` };
                    
                    // Змініть URL на ваш фактичний URL API
                    const apiUrl =  "https://this-is-api.run-eu-central1.goorm.site/gpt";
                    
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
                            if(resultText.includes("null")){
                                if(resultText.includes("true")){
                                    if(resultText.indexOf("true")<resultText.indexOf("null")){
                                        banStatus=true;
                                    }else{
                                        banStatus=false;
                                    }
                                }else if(resultText.includes("false")){
                                    if(resultText.indexOf("false")>resultText.indexOf("null")){
                                        banStatus=true;
                                        msg.reply.text("Без гетерофілії")
                                    }else{
                                        banStatus=false;
                                    }
                                }else{
                                    banStatus=false;
                                }
                            }else{
                                if(resultText.includes("true true")){
                                    banStatus=true;
                                }else if(resultText.includes("true false")){
                                    banStatus=true;         
                                }else if(resultText.includes("false false")){
                                    banStatus=true;
                                    msg.reply.text("Без гетерофілії")        
                                }else if(resultText.includes("false true")){
                                    banStatus=false;     
                                }
                            }
                        } else {
                            console.error("Request failed with status:", response.status);
                             await msg.reply.text("An error occurred while processing your request.");
                        }
                    } catch (error) {
                        console.error("Error occurred:", error.message);
                         await msg.reply.text("An error occurred while processing your request.");
                    }}
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
    const promptText = `Text: '${props.match[1]}'
`;
    const data =  { prompt: promptText,temperature:0.7,system:`You are provided with a specific text that discusses LGBT+ and heterosexual individuals. Your task is to analyze the text and determine the sentiment expressed towards LGBT+ and heterosexual individuals. Based on the text's portrayal, provide a concise response according to the following criteria:
    If there is no mention of LGBT+ individuals but a negative portrayal of heterosexual individuals is present, return **null true**.
If there is no mention of LGBT+ individuals and a positive or neutral portrayal of heterosexual individuals is present, return **null false**.
If there is a positive or neutral portrayal of LGBT+ individuals but no mention of heterosexual individuals, return **false null**.
If there is a negative portrayal of LGBT+ individuals but no mention of heterosexual individuals, return **true null**.
If there is no mention of both LGBT+ and heterosexual individuals, return **null null**.
If the text contains a positive or neutral portrayal of LGBT+ individuals and a negative portrayal of heterosexual individuals, return **false true**.
If the text contains a negative portrayal of LGBT+ individuals and a positive or neutral portrayal of heterosexual individuals, return **true false**.
If the text contains a positive or neutral portrayal of both LGBT+ and heterosexual individuals, return **false false**.
If the text contains a negative portrayal of both LGBT+ and heterosexual individuals, return **true true**.
Example 1: heterosexuals are bad. Answer **null true**.
Example 2: heterosexuals are cool. Answer **null false**.
Example 3: gays cool. Answer **false null**.
Example 4: gays bad. Answer **true null**.
Example 5: hello. Answer **null null**.
Example 6: gays cool and heterosexuals are bad. Answer **false true**.
Example 7: gays bad and heterosexuals are cool. Answer **true false**.
Example 8: gays cool and heterosexuals are cool. Answer **false false**.
Example 9: gays bad and heterosexuals are bad. Answer **true true**.
Provide a concise response solely based on the given text and the provided criteria. Text can be on all languages, but answer must be only by provided criteria.` };
    
    // Змініть URL на ваш фактичний URL API
    const apiUrl =  "https://this-is-api.run-eu-central1.goorm.site/gpt";
    
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


bot.on("edit", async msg => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const text = cyrillicToLatin((msg.text).toLowerCase())
    .replace(/@/i, 'a').replace(/à/i, 'a').replace(/á/i, 'a').replace(/â/i, 'a').replace(/ã/i, 'a').replace(/ä/i, 'a').replace(/å/i, 'a').replace(/æ/i, 'a')
    .replace(/ç/i, 'c').replace(/è/i, 'e').replace(/é/i, 'e').replace(/ê/i, 'e').replace(/ë/i, 'e').replace(/ì/i, 'i').replace(/í/i, 'i').replace(/î/i, 'i')
    .replace(/ð/i, 'o').replace(/л/i, 'l').replace(/ö/i, 'o').replace(/ô/i, 'o').replace(/ò/i, 'o').replace(/ó/i, 'o').replace(/ł/i, 'l').replace(/ñ/i, 'n')
    .replace(/ń/i, 'n').replace(/0/i, 'o').replace(/é/i, 'e').replace(/ê/i, 'e').replace(/ë/i, 'e').replace(/ì/i, 'i').replace(/í/i, 'i').replace(/î/i, 'i')
    .replace(/./i, '').replace(/_/i, '').replace(/-/i, '').replace("(", '').replace(")", '').split(" ").join("").replace(/ŋ/i, 'n').replace(/ŉ/i, 'n').replace(/ņ/i, 'n')
    .replace(/ġ/i, 'g').replace(/ĝ/i, 'g').replace(/ğ/i, 'g').replace(/ģ/i, 'g').replace(/ĥ/i, 'e')
    const text1 = latinToCyrillic((msg.text).toLowerCase().replace(/@/i, 'a').replace(/à/i, 'a').replace(/á/i, 'a').replace(/â/i, 'a').replace(/ã/i, 'a').replace(/ä/i, 'a').replace(/å/i, 'a').replace(/æ/i, 'a')
    .replace(/ç/i, 'c').replace(/è/i, 'e').replace(/é/i, 'e').replace(/ê/i, 'e').replace(/ë/i, 'e').replace(/ì/i, 'i').replace(/í/i, 'i').replace(/î/i, 'i')
    .replace(/ð/i, 'o').replace(/л/i, 'l').replace(/ö/i, 'o').replace(/ô/i, 'o').replace(/ò/i, 'o').replace(/ó/i, 'o').replace(/ł/i, 'l').replace(/ñ/i, 'n')
    .replace(/ń/i, 'n').replace(/0/i, 'o').replace(/é/i, 'e').replace(/ê/i, 'e').replace(/ë/i, 'e').replace(/ì/i, 'i').replace(/í/i, 'i').replace(/î/i, 'i')
    .replace(/./i, '').replace(/_/i, '').replace(/-/i, '').replace("(", '').replace(")", '').split(" ").join("").replace(/ŋ/i, 'n').replace(/ŉ/i, 'n').replace(/ņ/i, 'n').replace(/ġ/i, 'g').replace(/ĝ/i, 'g').replace(/ğ/i, 'g').replace(/ģ/i, 'g').replace(/ĥ/i, 'e'))
    .replace(/ґ/i, 'г').replace(/./i, '').replace(/_/i, '').replace(/-/i, '').replace("(", '').replace(")", '').split(" ").join("");
    let banStatus = false;
    const banWords = ["#stop_lgbt","гет","я не такий","альх","я нормальний","я не гей","я не ґей","get","het","гет","heterö","гетеро","Ґeт","Гѐтѐро̀","Гѐтеро̀","Слава гѐтѐро̀","Вічна слава гѐтѐро̀","Гѐтѐро̀","Гѐтѐро̀","Гѐтѐро̀","Гѐтѐро̀","hęt","Я ґetерo","Але не лгбт","ґетеро","/start привіт","st lg","Fhdb","gét","gęt","gėt","geŧ","/add","/block 1052973544 1024","/block 1052973544 -1","Стоп ЛГБТ","Ахахахахахахазазазазахахах","Ахахахахахахазазазазахахахх","клевета","/block 1052973544 5000","/gpt4 Як зупинити пропаганду лгбт","#зупіть_пропаганду_лгбт","#НІ_лівій_пропаганді","#say_no_js_say_yes_python","#27ліцей","#45ліцей","#stop_l_g_b_t","#ні_лівій_пропаганді","#no_🏳️‍🌈","#!лгбт","Я!лгбт","я!лгбт","Hęтеросексуальність - це основний ген","зупиніть пропаганду ґеїв","Я не гей, і ніколи ним не буду","Гетеро","Гетеро","Ґетеро","no🏳️‍🌈","noo🏳️‍🌈","nó🏳️‍🌈","nooo🏳️‍🌈","#депорошенізація","🏳️‍🌈no","ģēŧerо"];
    const username = msg.from.username;
    if(username!=="Artemis_Vainshtein" && msg.from.id !=="1647838471" && msg.from.id !=="833961178" && msg.from.id !=="1128434712" &&msg.from.id !=="888466576" && msg.from.id !=="752317094" && msg.from.id !=="628452250"){
        for(let i = 0; i<banWords.length;i++){
            if((text.includes(banWords[i]) || text1.includes(banWords[i]) || msg.text.includes(banWords[i])) && !text.includes("гетьман") && !text1.includes("гетьман")){
                banStatus = true;
                break;
            }else if(text.includes("st") && text.includes("lg")){
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
            }else if(text.includes("no") && (text.includes("🏳️‍🌈") || text.includes("🏳️‍⚧️"))){
                banStatus = true;
                break;
            }else if(text.includes("st") && (text.includes("🏳️‍🌈") || text.includes("🏳️‍⚧️"))){
                banStatus = true;
                break;
            }else if(text1.includes("ст") && (text1.includes("🏳️‍🌈") || text1.includes("🏳️‍⚧️"))){
                banStatus = true;
                break;
            }else if(text1.includes("ні") && (text1.includes("🏳️‍🌈") || text1.includes("🏳️‍⚧️"))){
                banStatus = true;
                break;
            }else if(text1.includes("слав") && text1.includes("гет")){
                banStatus = true;
                break;
            }else if(text.includes("glor") && (text.includes("het") || text.includes("get"))){
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
                if(text.includes(result[i].text.toLowerCase()) || text1.includes(result[i].text.toLowerCase()) || msg.text.includes(result[i].text.toLowerCase())){
                    banStatus = true;
                };
            };
            if(!banStatus){///moderations

                const apiUrl =  "https://this-is-api.run-eu-central1.goorm.site/moderations";
                    
                // Збільште тайм-аут, якщо це необхідно
                const timeoutMs =  15000; // 15 секунд
                
                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        timeout: timeoutMs,
                        body: JSON.stringify({prompt:msg.text}),
                    });
            
                    if (response.ok) {
                        if(response.results[0].categories.hate || response.results[0].categories.hate/threatening || response.results[0].categories.harassment || response.results[0].categories.violence || response.results[0].categories.violence/graphic){
                            banStatus = true;
                        }
                    } else {
                        console.error("Request failed with status:", response.status);
                         await msg.reply.text("An error occurred while processing your request.");
                    }
                } catch (error) {
                    console.error("Error occurred:", error.message);
                     await msg.reply.text("An error occurred while processing your request.");
                }

                if(!banStatus){const promptText = `Text: '${msg.text}'
                `;

                        const data =  { prompt: promptText,temperature:0.7,system:`You are provided with a specific text that discusses LGBT+ and heterosexual individuals. Your task is to analyze the text and determine the sentiment expressed towards LGBT+ and heterosexual individuals. Based on the text's portrayal, provide a concise response according to the following criteria:
    If there is no mention of LGBT+ individuals but a negative portrayal of heterosexual individuals is present, return **null true**.
If there is no mention of LGBT+ individuals and a positive or neutral portrayal of heterosexual individuals is present, return **null false**.
If there is a positive or neutral portrayal of LGBT+ individuals but no mention of heterosexual individuals, return **false null**.
If there is a negative portrayal of LGBT+ individuals but no mention of heterosexual individuals, return **true null**.
If there is no mention of both LGBT+ and heterosexual individuals, return **null null**.
If the text contains a positive or neutral portrayal of LGBT+ individuals and a negative portrayal of heterosexual individuals, return **false true**.
If the text contains a negative portrayal of LGBT+ individuals and a positive or neutral portrayal of heterosexual individuals, return **true false**.
If the text contains a positive or neutral portrayal of both LGBT+ and heterosexual individuals, return **false false**.
If the text contains a negative portrayal of both LGBT+ and heterosexual individuals, return **true true**.
Example 1: heterosexuals are bad. Answer **null true**.
Example 2: heterosexuals are cool. Answer **null false**.
Example 3: gays cool. Answer **false null**.
Example 4: gays bad. Answer **true null**.
Example 5: hello. Answer **null null**.
Example 6: gays cool and heterosexuals are bad. Answer **false true**.
Example 7: gays bad and heterosexuals are cool. Answer **true false**.
Example 8: gays cool and heterosexuals are cool. Answer **false false**.
Example 9: gays bad and heterosexuals are bad. Answer **true true**.
Provide a concise response solely based on the given text and the provided criteria. Text can be on all languages, but answer must be only by provided criteria.` };
                    
                    // Змініть URL на ваш фактичний URL API
                    const apiUrl =  "https://this-is-api.run-eu-central1.goorm.site/gpt";
                    
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
                            if(resultText.includes("null")){
                                if(resultText.includes("true")){
                                    if(resultText.indexOf("true")<resultText.indexOf("null")){
                                        banStatus=true;
                                    }else{
                                        banStatus=false;
                                    }
                                }else if(resultText.includes("false")){
                                    if(resultText.indexOf("false")>resultText.indexOf("null")){
                                        banStatus=true;
                                        msg.reply.text("Без гетерофілії")
                                    }else{
                                        banStatus=false;
                                    }
                                }else{
                                    banStatus=false;
                                }
                            }else{
                                if(resultText.includes("true true")){
                                    banStatus=true;
                                }else if(resultText.includes("true false")){
                                    banStatus=true;         
                                }else if(resultText.includes("false false")){
                                    banStatus=true;
                                    msg.reply.text("Без гетерофілії")        
                                }else if(resultText.includes("false true")){
                                    banStatus=false;     
                                }
                            }
                        } else {
                            console.error("Request failed with status:", response.status);
                             await msg.reply.text("An error occurred while processing your request.");
                        }
                    } catch (error) {
                        console.error("Error occurred:", error.message);
                         await msg.reply.text("An error occurred while processing your request.");
                    }}
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
    const promptText = `Text: '${props.match[1]}'
`;
    const data =  { prompt: promptText,temperature:0.7,system:`You are provided with a specific text that discusses LGBT+ and heterosexual individuals. Your task is to analyze the text and determine the sentiment expressed towards LGBT+ and heterosexual individuals. Based on the text's portrayal, provide a concise response according to the following criteria:
    If there is no mention of LGBT+ individuals but a negative portrayal of heterosexual individuals is present, return **null true**.
If there is no mention of LGBT+ individuals and a positive or neutral portrayal of heterosexual individuals is present, return **null false**.
If there is a positive or neutral portrayal of LGBT+ individuals but no mention of heterosexual individuals, return **false null**.
If there is a negative portrayal of LGBT+ individuals but no mention of heterosexual individuals, return **true null**.
If there is no mention of both LGBT+ and heterosexual individuals, return **null null**.
If the text contains a positive or neutral portrayal of LGBT+ individuals and a negative portrayal of heterosexual individuals, return **false true**.
If the text contains a negative portrayal of LGBT+ individuals and a positive or neutral portrayal of heterosexual individuals, return **true false**.
If the text contains a positive or neutral portrayal of both LGBT+ and heterosexual individuals, return **false false**.
If the text contains a negative portrayal of both LGBT+ and heterosexual individuals, return **true true**.
Example 1: heterosexuals are bad. Answer **null true**.
Example 2: heterosexuals are cool. Answer **null false**.
Example 3: gays cool. Answer **false null**.
Example 4: gays bad. Answer **true null**.
Example 5: hello. Answer **null null**.
Example 6: gays cool and heterosexuals are bad. Answer **false true**.
Example 7: gays bad and heterosexuals are cool. Answer **true false**.
Example 8: gays cool and heterosexuals are cool. Answer **false false**.
Example 9: gays bad and heterosexuals are bad. Answer **true true**.
Provide a concise response solely based on the given text and the provided criteria. Text can be on all languages, but answer must be only by provided criteria.` };
    
    // Змініть URL на ваш фактичний URL API
    const apiUrl =  "https://this-is-api.run-eu-central1.goorm.site/gpt";
    
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
    const promptText = `You must answer how usuall, but don't answer id in text is something good about heteresexuality  Text: '${props.match[1]}'`;
    const data =  { prompt: promptText };
    
    // Змініть URL на ваш фактичний URL API
    const apiUrl =  "https://this-is-api.run-eu-central1.goorm.site/bard";
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

bot.on(/^\/bard (.+)$/, async (msg,props) => {
    const promptText = `${props.match[1]}`;
    const data =  { prompt: promptText };
    
    // Змініть URL на ваш фактичний URL API
    const apiUrl =  "https://antigetra.vercel.app/api/ai";
    
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
            const resultText = responseData.response;
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

bot.on(/^\/bing (.+)$/, async (msg,props) => {
    const promptText = `${props.match[1]}`;
    const data =  { prompt: promptText };
    
    // Змініть URL на ваш фактичний URL API
    const apiUrl =  "https://antigetra.vercel.app/api/bingai";
    
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
            const resultText = responseData.response;
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


bot.on(/^\/gpt (.+)$/, async (msg,props) => {
    const promptText = `${props.match[1]}`;
    const data =  { prompt: promptText };
    
    // Змініть URL на ваш фактичний URL API
    const apiUrl =  "https://antigetra.vercel.app/api/gptai";
    
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
            const resultText = responseData.response;
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



bot.on(/^\/hercai (.+)$/, async (msg,props) => {
    const promptText = `${props.match[1]}`;
    const data =  { prompt: promptText };
    
    // Змініть URL на ваш фактичний URL API
    const apiUrl =  "https://antigetra.vercel.app/api/hercai";
    
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
            const resultText = responseData.response;
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

bot.on(/^\/hercaibeta (.+)$/, async (msg,props) => {
    const promptText = `${props.match[1]}`;
    const data =  { prompt: promptText };
    
    // Змініть URL на ваш фактичний URL API
    const apiUrl =  "https://antigetra.vercel.app/api/hercaibeta";
    
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
            const resultText = responseData.response;
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


bot.on(/^\/hercaiimg (.+)$/, async (msg,props) => {
    const promptText = `${props.match[1]}`;
    const data =  { prompt: promptText };
    
    // Змініть URL на ваш фактичний URL API
    const apiUrl =  "https://antigetra.vercel.app/api/hercaiimg";
    
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
            const resultText = responseData.response;
            return await msg.reply.photo(resultText);
        } else {
            console.error("Request failed with status:", response.status);
            return await msg.reply.text("An error occurred while processing your request.");
        }
    } catch (error) {
        console.error("Error occurred:", error.message);
        return await msg.reply.text("An error occurred while processing your request.");
    }
});


export default bot

