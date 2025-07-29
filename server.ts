import express from "express"
import payload from "payload"
import { config } from "dotenv"

config()

const app = express()
const PORT = process.env.PORT || 3001

// Инициализация Payload CMS
const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || "your-secret-here",
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Добавляем собственные роуты если нужно
  app.get("/", (_, res) => {
    res.redirect("/admin")
  })

  app.listen(PORT, async () => {
    payload.logger.info(`Server listening on port ${PORT}`)
  })
}

start()
