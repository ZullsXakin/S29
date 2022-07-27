import { Command } from "../../structures/Command"
import { MessageEmbed } from "discord.js"

export default new Command({
  name: "ping",
  description: "Pong!",
  defaultPermission: true,
  run: async ({ interaction }) => {
    await interaction.reply({
      embeds: [
        new MessageEmbed({
          description: `**Pong!**`,
          color: "#000000",
        }),
      ],
    })
  },
})
