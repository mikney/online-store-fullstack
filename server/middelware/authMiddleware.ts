import {Errback, NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

export default function(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({message: "not authorized"})
    }
    const secretKey = process.env.SECRET_KEY as string
    const decoded = jwt.verify(token, secretKey)
    req.body.user = decoded
    next()
  } catch (e) {
    res.status(401).json({message: "Неавторизован"})
  }
}