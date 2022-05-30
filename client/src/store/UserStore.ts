import {makeAutoObservable} from "mobx";
import {UserAttributes} from "../interfaces/User";

export default class UserStore {
  _isAuth: boolean = false
  _user: UserAttributes = {} as UserAttributes
  constructor() {

    makeAutoObservable(this)
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool
    if (!bool) localStorage.clear()
  }

  setUser(user: UserAttributes) {
    this._user = user
  }

  get isAuth(): boolean {
    return this._isAuth
  }

  get user(): UserAttributes {
    return this._user
  }
}