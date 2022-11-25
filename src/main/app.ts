import "reflect-metadata"
import express, {json} from 'express'
import env from "../infra/config/env"
import { setUpRoutes } from "./config/routes"

const SERVER_PORT = env.SERVER_PORT
const app = express()

app.use(json())
setUpRoutes(app)

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})