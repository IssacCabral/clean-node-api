import { Request, Response, NextFunction } from "express"

export const cors = (req: Request, res: Response, next: NextFunction) => {
  // setando um header
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-methods', '*')
  res.set('access-control-allow-headers', '*')
  next()
}