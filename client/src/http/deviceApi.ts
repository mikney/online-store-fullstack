import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import {Brand, Device, Type} from "../interfaces/Device";

export const createType = async (type: Type) => {
  const {data} = await $authHost.post('api/type', type)
  return data
}

export const fetchTypes = async () => {
  const {data} = await $host.get('api/type')
  return data
}

export const createBrand = async (brand: Brand) => {
  const {data} = await $authHost.post('api/brand', brand)
  return data
}

export const fetchBrands = async () => {
  const {data} = await $host.get('api/brand', )
  return data
}

export const createDevice = async (device: FormData) => {
  const {data} = await $authHost.post('api/device', device)
  return data
}

export const fetchDevices = async (typeId: number | null, brandId: number | null, page: number, limit= 5) => {
  const {data} = await $host.get('api/device', {params: {
      typeId, brandId, page, limit
    }})
  return data
}

export const fetchOneDevice = async (id: number) => {
  console.log('ewwe')
  const {data} = await $host.get('api/device/' + id)
  console.log(data)
  return data
}