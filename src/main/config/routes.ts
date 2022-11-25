import { Express} from "express"
import mainRouter from "../routes/main-router"

export default (app: Express) => {
  app.use(mainRouter)
}