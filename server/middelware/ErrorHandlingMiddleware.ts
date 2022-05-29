import {Request, Response, Errback, NextFunction} from "express";
import ApiError from "../error/ApiError";


export default function (err: Errback | ApiError, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({message: err.message})
  }
  res.status(500).json({message: "Непредвиденная ошибка"})
}