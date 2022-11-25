import { Express, Router } from "express"

export const setUpRoutes = (app: Express) => {
  const router = Router()

  router.get('/hello', (req, res) => {
    return res.json({message: 'Welcome to my server'})
  })

  app.use(router)
}