import { Request, Response, NextFunction } from 'express';
import ApiError from "../error/ApiError";
import models from "../models/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const generateJwt = (id: number, email: string, role: string) => {
  const secretKey = process.env.SECRET_KEY as string
  return jwt.sign({id, email, role}, secretKey, {expiresIn: '24h'})
}
class UserController {

  async registration(req: Request, res: Response, next: NextFunction) {
    const {email, password, role} = req.body
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректнные данные') )
    }
    const candidate = await models.User.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('Пользователь уже существует'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await models.User.create({email, role, password: hashPassword})
    const basket = await models.Basket.create({userId: user.id})
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({token})
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const {email, password} = req.body
    const user = await models.User.findOne({where: {email}})
    if (!user) {
      return next(ApiError.badRequest('Пользователь не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.badRequest('Указан неверный пароль'))
    }
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({token})
  }

  async check(req: Request, res: Response, next: NextFunction) {
    const {user} = req.body
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({token})
   }
}

export default  new UserController();