declare global {
  namespace NodeJS {
    interface ProcessEnv {
      token: string
      guildId: string
      enviroment: "dev" | "prod" | "debug"
      MONGODB_URL: string
    }
  }
}

export {}
