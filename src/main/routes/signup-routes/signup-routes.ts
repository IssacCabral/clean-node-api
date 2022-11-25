import { Router } from "express";

const signupRoutes = Router()

signupRoutes.post('/signup', (req, res) => {
  return res.json({ok: 'Rota de Signup'})
})

export default signupRoutes