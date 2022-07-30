import { Command } from "../../structures/Command"
import { Guild, GuildMember, MessageEmbed } from "discord.js"
import { bot } from "../../start"

export default new Command({
  name: "avatar",
  description: "Показывает аватар пользователя",
  options: [
    {
      name: "пользователь",
      type: "USER",
      description: "Пользователь",
      required: true,
    },
  ],
  defaultPermission: true,
  run: async ({ interaction }) => {
    const member = interaction.options.getMember("пользователь") as GuildMember
    const avatarClient = bot.user?.displayAvatarURL({ dynamic: true, size: 4096, format: "png" })
    const avatarPNG = member.user.displayAvatarURL({ dynamic: true, size: 4096, format: "png" })
    const avatarJPG = member.user.displayAvatarURL({ dynamic: true, size: 4096, format: "jpg" })
    const avatarWEBP = member.user.displayAvatarURL({ dynamic: true, size: 4096, format: "webp" })
    await interaction.reply({
      embeds: [
        new MessageEmbed({
          author: {
            name: member.user.tag,
            icon_url: avatarPNG,
          },
          title: `Аватарка пользователя ${member.user.username}`,
          description: `[PNG](${avatarPNG}) | [JPG](${avatarJPG}) | [WEBP](${avatarWEBP})`,
          image: {
            url: avatarPNG,
          },
          footer: {
            text: member.user.tag,
            icon_url: avatarClient,
          },
          timestamp: new Date(),
          color: "#000000",
        }),
      ],
    })
  },
})
