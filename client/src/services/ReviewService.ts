import { AxiosResponse } from "axios";
import $api from "../http";
import { ReviewResponse } from "../models/response/ReviewResponse";

export default class ReviewService {
    static async addReview(username: string, text: string, rating: number): Promise<AxiosResponse<ReviewResponse>> {
        return  $api.post('/review', {username ,text, rating });
    }

    static async getReviews(): Promise<AxiosResponse<ReviewResponse[]>> {
        return $api.get('/reviews');
    }
    static async deleteReview(reviewId: string, username: string): Promise<AxiosResponse<ReviewResponse>> {
        return $api.delete(`/reviews/${reviewId}`)
    }
}
