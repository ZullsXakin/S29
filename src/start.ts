require("dotenv").config()
import { Bot, MongoInit } from "."

export const bot = new Bot()
const Mongo = new MongoInit({ dbUrl: process.env.MONGODB_URL })

async function start() {
  Mongo.connect()
  await bot.start()
}
start()
