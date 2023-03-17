import {makeAutoObservable} from "mobx";

export default class AuthStore {
    constructor() {
        this._isvisible = false
        makeAutoObservable(this)
    }

    setIsVisible(bool) {
        this._isvisible = bool
    }

    get isVisible() {
        return this._isvisible
    }
}