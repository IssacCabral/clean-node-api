import { Router } from "express";

const router = Router();

router.get("/hello", (req, res) => {
  return res.json({ message: "Welcome to my server" });
});

export default router