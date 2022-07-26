import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, GuildMember, PermissionResolvable } from "discord.js"
import { Bot } from ".."

export interface ExtendedInteraction extends CommandInteraction {
  message: any
  member: GuildMember
}

interface RunOptions {
  bot: Bot
  interaction: ExtendedInteraction
  args: CommandInteractionOptionResolver
}

type RunFunction = (options: RunOptions) => any

export type CommandType = {
  userPermissions?: PermissionResolvable[]
  run: RunFunction
} & ChatInputApplicationCommandData
