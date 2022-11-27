import { Router } from "express";
import env from "../../../infra/config/env";

const signupRoutes = Router()

signupRoutes.post('/signup', (req, res) => {
  return res.json({ok: 'Rota de Signup'})
})

export default signupRoutes