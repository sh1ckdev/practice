// review-controller.js
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
            console.log('User nickname:', req.user.username);
            console.log('Review text:', text);
            console.log('Review rating:', rating);

            const reviewData = await reviewService.addReview(username, text, rating);

            return res.json(reviewData);
        } catch (e) {
            next(e);
        }
    }

    async getAllReviews(req, res, next) {
        try {
            const reviews = await reviewService.getAllReviews();

            return res.json(reviews);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ReviewController();
