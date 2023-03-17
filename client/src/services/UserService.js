import $api from "../http/index.js";

export default class UserService {
    static async users() {
        return $api.get('/user/users')
    }
}