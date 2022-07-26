import { CommandInteractionOptionResolver } from "discord.js"
import { Event, bot, ExtendedInteraction } from "../.."

export default new Event("interactionCreate", async interaction => {
  if (interaction.isCommand()) {
    const command = bot.commands.get(interaction.commandName)
    if (!command) return interaction.followUp("You have used a non existent command")

    command.run({
      args: interaction.options as CommandInteractionOptionResolver,
      bot,
      interaction: interaction as ExtendedInteraction,
    })
  }
})
