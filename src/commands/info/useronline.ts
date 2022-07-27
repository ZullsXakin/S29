import { Command } from "../../structures/Command"
import { Guild, MessageEmbed } from "discord.js"

export default new Command({
  name: "useronline",
  description: "Показывает количество пользователей на сервере",
  defaultPermission: true,
  run: async ({ interaction }) => {
    interaction.guild.members.fetch({ withPresences: true }).then(async fetchedMembers => {
      const totalOnline = fetchedMembers.filter(member => member.presence?.status === "online", "dnd")
      await interaction.reply({
        embeds: [
          new MessageEmbed({
            description: `Сейчас в этой гильдии онлайн-участников: __${totalOnline.size}__! <:online:723010989841003520>`,
            color: "#000000",
            footer: {
              icon_url: interaction.guild.iconURL(),
              text: "Всего пользователей: " + fetchedMembers.size,
            },
          }),
        ],
      })
    })
  },
})
