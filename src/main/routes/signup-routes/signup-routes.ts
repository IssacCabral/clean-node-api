import { Router } from "express";
import { makeSignUpController } from "../../factories/signup";
import { ExpressAdapter } from "../adapters/express-routes-adapter";

const signupRoutes = Router()

signupRoutes.post('/signup', ExpressAdapter.adaptRoute(makeSignUpController()))
// signupRoutes.post('/signup', (req, res) => {
//   return res.json({ok: 'ok'})
// })

export default signupRoutes