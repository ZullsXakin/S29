import { bot, Event } from "../.."
const Humanize = require("humanize-plus")

export default new Event("ready", () => {
  console.log(`[Client] ${bot.user.username} successfully connected ‍🔥`)
  const status = `${Humanize.intComma(bot.users.cache.size)} пользователей`
  bot.user.setStatus("dnd")
  setInterval(() => {
    bot.user.setActivity(status, { type: "WATCHING" })
  }, 60000)
})
