import { Express } from "express"
import { bodyParser, cors } from "../middlewares/index"
import router from "./routes"

export default (app: Express) => {
  app.use(bodyParser)
  app.use(cors)
  app.use(router)
}