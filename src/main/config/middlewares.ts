import { Express } from "express"
import { bodyParser } from "../middlewares/body-parser"
import {cors} from '../middlewares/cors'

export default (app: Express) => {
  app.use(bodyParser)
  app.use(cors)
}