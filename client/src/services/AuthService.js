import $api from "../http/index.js";

export default class AuthService {
    static async registration(email, username, password) {
        return $api.post('/user/registration', {email, username, password})
    }

    static async login(password, email = '', username = '') {
        return $api.post('/user/login', {password, email, username})
    }

    static async logout() {
        return $api.get('/user/logout')
    }

    static async refresh() {
        return $api.get('/user/refresh')
    }

    static async checkEmail(email) {
        return await $api.get(`/user/checkEmail/${email}`)
    }

    static async checkUsername(username) {
        return await $api.get(`/user/checkUsername/${username}`)
    }

    static async checkPassword(password) {
        return $api.post('/user/checkPassword', {password})
    }
}