import {makeAutoObservable} from "mobx";
import {Brand, Device, Type} from "../interfaces/Device";

export default class DeviceStore {
  _types: Type[] = []
  _brands: Brand[] = []
  _devices: Device[] = []
  selectedBrand: Brand = {} as Brand
  selectedType: Type = {} as Type
  _page = 1
  _totalCount = 0
  _limit = 3

  constructor() {
    makeAutoObservable(this)
  }

  setTypes(types: Type[]) {
    this._types = types
  }

  setBrands(brands: Brand[]) {
    this._brands = brands
  }

  setDevices(devices: Device[]) {
    this._devices = devices
  }
  setSelectedBrand(brand: Brand) {
    this.selectedBrand = brand
  }
  setSelectedType(type: Type) {
    this.selectedType = type
  }

  get types(): Type[] {
    return this._types
  }
  get brands(): Brand[] {
    return this._brands
  }
  get devices(): Device[] {
    return this._devices
  }

  setPage(page: number) {
    this._page = page
  }
  setTotalCount(count: number) {
    this._totalCount = count
  }

  get totalCount() {
    return this._totalCount
  }
  get page() {
    return this._page
  }
  get limit() {
    return this._limit
  }
}