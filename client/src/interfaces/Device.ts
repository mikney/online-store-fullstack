export interface Type {
  id?: number,
  name: string
}

export interface Brand {
  id?: number,
  name: string
}

export interface Device {
  id: number;
  name: string;
  price: number;
  rating?: number;
  img: string
  brandId?: number;
  typeId?: number;
  basket?: number;
  info?: any[]
}

export interface DeviceInfo {
  title: string;
  description: string;
  number: number
}