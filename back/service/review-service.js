// review-service.js
const ReviewModel = require('../models/review-model');
const ApiError = require('../exceptions/api-error'); 

class ReviewService {
    async addReview(username, text, rating) {
        try {
            const review = await ReviewModel.create({ username, text, rating });
            return review;
        } catch (error) {
            throw ApiError.BadRequest('Ошибка при добавлении отзыва');
        }
    }

    async getAllReviews() {
        try {
            const reviews = await ReviewModel.find();
            return reviews;
        } catch (error) {
            throw new ApiError.InternalServerError('Ошибка при получении отзывов');
        }
    }
}

module.exports = new ReviewService();
