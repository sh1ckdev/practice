import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { API_URL } from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
import { IReviews } from "../models/IReview";
import ReviewService from "../services/ReviewService";
import { runInAction } from 'mobx';
// import { ReviewResponse } from './../models/response/ReviewResponse';


export default class Store {
    user = {} as IUser;
    review = {} as IReviews
    isAuth = false;
    users: IUser[] = [];
    reviews: IReviews[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) { 
        this.isAuth = bool;
    }

    setUser(user: IUser) { 
        this.user = user;
    }

    async login(username: string, password: string, navigate: () => void) {
        try {
            const response = await AuthService.login(username, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            if (this.isAuth) {
                navigate(); 
              }
        } catch (e) {
        }
    }

    async registration(username: string, email: string, password: string) {
        try {
            const response = await AuthService.registration(username, email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken); 
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
        } 
    }

    async getUsers() {
        try {
            const response = await axios.get<IUser[]>(`${API_URL}/users`);
            this.users = response.data;
        } catch (e) {
            console.error("Ошибка получения пользователей:", e);
        }
    }

    async addReview(username: string, text: string, rating: number) {
        try {
            await ReviewService.addReview(username, text, rating);
            this.getReviews();
        } catch (error) {
            console.error("Ошибка при добавлении отзыва:", error);
        }
    }

    async deleteReview(username: string, reviewId: string){
        try {
            await ReviewService.deleteReview(reviewId, username)
            this.getReviews();
        } catch (error) {
            console.error("Ошибка при удалении отзыва:", error);
        }
    }

    async getReviews() {
        try {
            const response = await axios.get<IReviews[]>(`${API_URL}/reviews`);
            runInAction(() => {
                this.reviews = response.data;
            }); 
            } catch (error) {
            
        }
    }
}
