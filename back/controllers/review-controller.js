const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const reviewService = require('../service/review-service');

class ReviewController {
    async addReview(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()));
            }

            const { username } = req.user;
            const { text, rating } = req.body;
            const reviewData = await reviewService.addReview(username, text, rating);

            return res.json(reviewData);
        } catch (e) {
            next(e);
        }
    }

    async deleteReview(req, res, next) {
        try {
            const { username } = req.user;
            const { reviewId } = req.params;   
            const existingReview = await reviewService.getReviewById(reviewId);
            if (!existingReview) {
                return next(ApiError.NotFound('Отзыв не найден'));
            }
            if (existingReview.username !== username) {
                return next(ApiError.Forbidden('Недостаточно прав для удаления этого отзыва'));
            }
    
            await reviewService.deleteReview(reviewId);
    
            return res.json({ message: 'Отзыв успешно удален' });
        } catch (error) {
            next(error);
        }
    }
    

    async getAllReviews(req, res, next) {
        try {
            const reviews = await reviewService.getAllReviews();

            return res.json(reviews);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ReviewController();
