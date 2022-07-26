import mongoose from "mongoose"

type dbType = {
  dbUrl: string
}

export class MongoInit {
  readonly dbUrl: string
  constructor({ dbUrl }: dbType) {
    this.dbUrl = dbUrl
  }

  public connect() {
    const dbOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
    mongoose.connect(this.dbUrl, dbOptions)

    mongoose.connection.on("connected", () => {
      console.log(`[Mongo] Successfully connected ‍🔥`)
    })
    mongoose.connection.on("err", err => {
      console.error(`[Mongo] Connection error: \n${err.stack}`)
      return process.exit(0)
    })

    mongoose.connection.on("disconnected", () => {
      console.warn("[Mongo] Mongoose connection lost")
      return process.exit(0)
    })
  }
}
