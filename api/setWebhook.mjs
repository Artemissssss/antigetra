import {setWebhook} from "telebot-vercel"
import bot from "../src/bot.mjs"

const path = "api/telegram.mjs"

export default async function(){
    setWebhook({bot, path, handleErrors: true})
} 
