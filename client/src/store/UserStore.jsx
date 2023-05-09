import {makeAutoObservable} from "mobx";
import UserService from "../services/UserService.js";
import AuthService from "../services/AuthService.js";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    async login(password, email = '', username = '') {
        try {
            const res = await AuthService.login(password, email, username)
            localStorage.setItem('token', res.data.accessToken)
            this.setIsAuth(true)
            console.log(res)
            this.setUser(res.data.userData)
        } catch (e) {
            console.log(e?.response?.data)
        }
    }

    async registration(email, username, password) {
        try {
            const res = await AuthService.registration(email, username, password)
        } catch (e) {
            console.log(e?.response?.data)
        }
    }

    async logout() {
        try {
            const res = await AuthService.logout()
            localStorage.removeItem('token')
            this.setIsAuth(false)
            this.setUser({})
        } catch (e) {
            console.log(e?.response?.data)
        }
    }

    async checkAuth() {
        try {
            const res = await AuthService.refresh()
            localStorage.setItem('token', res.data.accessToken)
            this.setIsAuth(true)
            this.setUser(res.data.userData)
        } catch (e) {
            console.log(e?.response?.data)
        }
    }
}