import { Command } from "../../structures/Command"
import { GuildMember, MessageEmbed } from "discord.js"

export default new Command({
  name: "userinfo",
  description: "Информация о пользователе",
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
    const avatar = member.user.displayAvatarURL({ dynamic: true, size: 4096, format: "png" })
    const user = await member.user.fetch()
    await interaction.reply({
      embeds: [
        new MessageEmbed({
          author: {
            name: user.tag,
            icon_url: avatar,
            // @ts-ignore 
            thumbnail: {
              url: avatar,
            },
            image: user.bannerURL({ dynamic: true, size: 2048, format: "png" }),
            footer: {
              text: `Команда: /user @user`,
              icon_url: avatar,
            },
            timestamp: new Date(),
          },
          fields: [
            {
              name: "Сервер участник",
              value: `🗒️ | Всего ролей: **${member.roles.cache.size}**\n:clipboard: | Приорететная роль: **${
                member.roles.highest
              }**\n:art: | Цвет роли hex: \`${member.displayHexColor.toUpperCase()}\`\n:calendar: | Зашёл: <t:${Math.floor(
                member.joinedTimestamp / 1000,
              )}:R>`,
            },
            {
              name: "Общая",
              value: `:calendar: | Дата создания: <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>\n:id: | Айди: **${member.id}**\n${
                member.user.bot ? ":robot: | Бот" : ":robot: | Пользователь"
              } | Бот: **${member.user.bot ? "Да" : "Нет"}**`,
            },
          ],
          color: "#000000",
        }),
      ],
    })
  },
})
