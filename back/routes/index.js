const Router = require('express').Router
const userController = require('../controllers/user-controller')
const ReviewController = require('../controllers/review-controller')
const router = new Router()
const {body, check} = require ('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')
const reviewController = require('../controllers/review-controller')

router.post('/registration', 
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers)
router.post(
    '/review',
    authMiddleware,
    [
        check('text', 'Текст отзыва не может быть пустым').notEmpty(),
        check('rating', 'Рейтинг должен быть числом от 1 до 5').isInt({ min: 1, max: 5 }),
    ],
    reviewController.addReview
);
router.delete('/reviews/:reviewId', authMiddleware, reviewController.deleteReview)
router.get('/reviews', reviewController.getAllReviews);
router.put('/updateProfile/:userId', authMiddleware, userController.updateProfile)


module.exports = router