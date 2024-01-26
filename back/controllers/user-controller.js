const UserService = require('../service/user-service')
const {validationResult} = require ('express-validator')
const ApiError = require('../exceptions/api-error')
const userService = require('../service/user-service')
const UserModel = require('../models/user-modal')

class UserController {
    async registration(req, res, next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                next(ApiError.BadRequest('Ошибка валидации', errors.array()))
            }
            const {username, email, password} = req.body
            const userData = await UserService.registration(username, email, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next){
        try {
            const {username, password} = req.body
            const userData = await UserService.login(username, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (error) {
            next(error)
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await UserModel.find({}, 'username');
            const usernames = users.map(user => user.username);
            res.json(usernames);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController()