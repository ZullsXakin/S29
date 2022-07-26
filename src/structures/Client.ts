import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection } from "discord.js"
import { CommandType } from "../interfaces/Command"
import glob from "glob"
import { promisify } from "util"
import { RegisterCommandsOptions } from "../interfaces/Client"
import { Event } from "./Event"

const globPromise = promisify(glob)

export class Bot extends Client {
  commands: Collection<string, CommandType> = new Collection()

  constructor() {
    super({ intents: 32767 })
  }

  public async start() {
    await this.registerModules()
    await this.login(process.env.token)
  }
  public async importFile(filePath: string) {
    return (await import(filePath))?.default
  }

  private async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands)
      const guild = await this.guilds.cache.get(guildId)
      console.log(`[Commands] Registering commands to ${guild.name}`)
    } else {
      console.log(`[Commands] Enter guildId on .env file!`)
      return process.exit()
    }
  }

  private async registerModules() {
    const slashCommands: ApplicationCommandDataResolvable[] = []
    const commandFiles = await globPromise(`${__dirname}/../commands/*/*{.ts,.js}`)
    commandFiles.forEach(async filePath => {
      const command: CommandType = await this.importFile(filePath)
      if (!command.name) return

      this.commands.set(command.name, command)
      slashCommands.push(command)
    })
    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: process.env.guildId,
      })
    })

    const eventFiles = await globPromise(`${__dirname}/../events/*/*{.ts,.js}`)
    eventFiles.forEach(async filePath => {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath)
      this.on(event.event, event.run)
    })
  }
}
