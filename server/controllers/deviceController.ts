import {NextFunction, Request, Response} from "express";
import uuid from "uuid"
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import ApiError from "../error/ApiError";
import models from "../models/models";

class DeviceController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let {name, price, brandId, typeId, info} = req.body
      // @ts-ignore
      const {img} = req.files
      let fileName = uuidv4() + ".jpg"
      if (img) {
        if (Array.isArray(img)) {
          img[0].mv(path.resolve(__dirname, '..', 'static', fileName))
        }
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
      }
      const device = await models.Device.create({name, price, brandId, typeId, img: fileName})
      if (info) {
        info = JSON.parse(info)
        info.forEach((i: {title: string, description: string}) => {
          models.DeviceInfo.create({
            title: i.title,
            description: i.description,
            device: device.id
          })
        })
      }
      return res.json(device)
    } catch (e) {
      console.log(e)
      next(ApiError.badRequest("Не верный запрос"))
    }

  }

  async getAll(req: Request, res: Response) {
    let {brandId, typeId, limit, page} = req.body
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let devices;
    if (!brandId && !typeId) {
      devices= await models.Device.findAndCountAll({limit, offset})
    }
    if (brandId && !typeId) {
      devices= await models.Device.findAndCountAll({where: {brandId}, limit, offset})

    }
    if (!brandId && typeId) {
      devices= await models.Device.findAndCountAll({where: {typeId}, limit, offset})

    }
    if (brandId && typeId) {
      devices= await models.Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
    }
    return res.json(devices)
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params
    if (!id) {
      return next(ApiError.badRequest('Неверный формат id: ' + id))
    }
    const device = await models.Device.findOne(
      {
        where: {id: +id},
        include: [{model: models.DeviceInfo, as: 'info'}]
      }
    )
    return res.json({device})
  }

}

export default new DeviceController();