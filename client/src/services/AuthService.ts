import {AxiosResponse} from "axios";
import $api from "../http";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login(username:  string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post('/login', {username, password})
    }

    static async registration(username:  string, email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post('/registration', {username, email, password})
    }

    static async logout(): Promise<void>{
        return $api.post('/logout')
    }
}
