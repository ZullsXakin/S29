import { TextChannel } from "discord.js"
import { bot, Event } from "../.."

export default new Event("guildMemberAdd", member => {
  member.roles.add("845331705753108501")
  console.log(`${member.user.tag} connected to ${member.guild.name} server`)

  const welocmeText = {
    1: `Добро пожаловать на сервер ${member.guild.name}, <@${member.user.id}>!`,
    2: `Привет, <@${member.user.id}>! Я бот и меня зовут ${bot.user.username}!`,
    3: `Доброго дня, <@${member.user.id}>!`,
    4: `Добрый вечер, <@${member.user.id}>!`,
    5: `Хеллоу, <@${member.user.id}>!`,
    6: `Привет, <@${member.user.id}>!`,
    7: `Давно тебя ждали, <@${member.user.id}>!`,
  }

  const channel: any = member.guild.channels.cache.get("1000429334714126418") as TextChannel
  if (!channel) return
  channel.send(welocmeText[Math.floor(Math.random() * 7) + 1])
})
