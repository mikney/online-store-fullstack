import {Request, Response} from "express";
import models from "../models/models";

class BrandController {
  async create(req: Request, res: Response) {
    const {name} = req.body
    const brand = await models.Brand.create({name})
    res.json({brand})
  }

  async getAll(req: Request, res: Response) {
    const brands = await models.Brand.findAll()
    return res.json(brands)
  }
}

export default new BrandController();