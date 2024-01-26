// review-service.js
const ReviewModel = require('../models/review-model');
const ApiError = require('../exceptions/api-error'); 

class ReviewService {
    async addReview(username, text, rating) {
        try {
            const review = await ReviewModel.create({ username, text, rating });
            return review;
        } catch (error) {
            console.error('Ошибка при добавлении отзыва:', error);
            throw ApiError.BadRequest('Ошибка при добавлении отзыва');
        }
    }

    async getAllReviews() {
        try {
            const reviews = await ReviewModel.find();
            return reviews;
        } catch (error) {
            throw  ApiError.InternalServerError('Ошибка при получении отзывов');
        }
    }

    async getReviewById(reviewId) {
        try {
            const review = await ReviewModel.findById(reviewId);
            return review;
        } catch (error) {
            throw  ApiError.InternalServerError('Ошибка при получении отзыва по ID');
        }
    }

    async deleteReview(reviewId){
        try {
            const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);
            return deletedReview;
        } catch (error) {
            throw ApiError.BadRequest('Ошибка при удалении отзыва');
        }
    }
}

module.exports = new ReviewService();
