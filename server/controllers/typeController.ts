import {Request, Response} from "express";
import models from "../models/models"

class TypeController {
  async create(req: Request, res: Response) {
    const {name} = req.body
    const type = await models.Type.create({name})
    res.json({type})
  }

  async getAll(req: Request, res: Response) {
    const types = await models.Type.findAll()
    return res.json(types)
  }
}

export default new TypeController();