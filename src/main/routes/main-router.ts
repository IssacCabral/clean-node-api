import { Router } from "express";
import signupRoutes from "./signup-routes/signup-routes";

const mainRouter = Router()

export default mainRouter
                .use(signupRoutes)