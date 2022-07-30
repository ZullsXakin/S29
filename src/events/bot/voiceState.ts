import { TextChannel, VoiceState } from "discord.js"
import { bot, Event } from "../.."

let privateChannels = []
let categoryID: string = "1003027148744966266"
let channelID: string = "1003027275765264444"

export default new Event("voiceStateUpdate", async (OLD: VoiceState, NEW: VoiceState) => {
  if (
    (OLD.mute && !NEW.mute) ||
    (NEW.mute && !OLD.mute) ||
    (OLD.mute && OLD.deaf && !NEW.mute && !NEW.deaf) ||
    (OLD.mute && NEW.mute && NEW.deaf) ||
    (OLD.mute && OLD.deaf && NEW.mute && !NEW.deaf)
  )
    return

  // Создание
  if (NEW.channel != null && NEW.channel.id == channelID) {
    const textChannel = (await NEW.guild.channels.create(`Канал ${NEW.member.user.username}`, {
      type: "GUILD_TEXT",
      parent: categoryID,
      permissionOverwrites: [
        {
          id: NEW.guild.id,
          deny: ["VIEW_CHANNEL"],
        },
        {
          id: NEW.member.id,
          allow: ["VIEW_CHANNEL", "MANAGE_CHANNELS", "MANAGE_ROLES"],
        },
      ],
    })) as TextChannel

    const voiceChannel = await NEW.guild.channels.create(`Канал ${NEW.member.user.username}`, {
      type: "GUILD_VOICE",
      parent: categoryID,
      permissionOverwrites: [
        {
          id: NEW.member.id,
          allow: ["VIEW_CHANNEL", "MANAGE_CHANNELS", "MANAGE_ROLES"],
        },
      ],
    })
    await NEW.member.voice.setChannel(voiceChannel)

    const text: string = `Привет, <@${NEW.member.id}>! Я бот и меня зовут ${bot.user.username}, я создал войс для вас.`
    const code: any = await voiceChannel.createInvite({
      maxAge: 0,
      unique: true,
    })
    textChannel.send(`https://discord.gg/${code.code}`)
    textChannel.send(text)
    privateChannels.push({ voice: voiceChannel.id, text: textChannel.id, owner: NEW.member.id })
  }

  // Выдача прав
  if (NEW.channel != null) {
    const find = privateChannels.filter(s => s.voice == NEW.channel.id)
    if (find.length != 0) {
      const textChannel = bot.channels.cache.get(find[0].text)
      // @ts-ignore
      await textChannel.permissionOverwrites.create(NEW.member.id, {
        VIEW_CHANNEL: true,
      })
    }
  }

  // Удаление прав / удаление канала
  if (OLD.channel != null) {
    const find = privateChannels.filter(s => s.voice == OLD.channel.id)
    if (find.length != 0) {
      const textChannel = bot.channels.cache.get(find[0].text)
      if (OLD.channel.members.size == 0) {
        const voiceChannel = bot.channels.cache.get(find[0].voice)
        await textChannel.delete()
        await voiceChannel.delete()
        // @ts-ignore
      } else if (find[0].owner != OLD.member.id) textChannel.permissionOverwrites.get(OLD.member.id)?.delete()
    }
  }
})
