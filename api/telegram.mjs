import {start} from "telebot-vercel"
import bot from "../src/bot.mjs"

export default async function(){
start({bot})
}