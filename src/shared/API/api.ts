import Api from "./path";
import axios from "axios";
import {Response} from "../../core/types/IResponse";

export class AuthApi extends Api {
    endpoint = '/auth'

    constructor() {
        super();
        this.api = axios.create({
            baseURL: 'http://localhost:3142'
        })
    }

    async login(login: string, password: string) {
        return (await this.api.post<Response<{ accessToken: string, refreshToken: string }>>(`${this.endpoint}/login`,
            {login, password})).data
    }

    async check() {
        return await this.api.get<{ success: boolean }>(`${this.endpoint}/check`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.data)
    }

    async logout() {
        return await this.api({
            method: 'post',
            url: `${this.endpoint}/logout`,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        }).then(res => res.data)
    }
}


export default new AuthApi()
