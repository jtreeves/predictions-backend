const express = require('express')
const passport = require('passport')
const usersController = require('../controllers/usersController')

const router = express.Router()

router.post(
    '/signup', 
    usersController.postSignup
)

router.post(
    '/login', 
    usersController.postLogin
)

router.get(
    '/:id', 
    passport.authenticate('jwt', {session: false}), 
    usersController.getUser
)

router.put(
    '/:id/name', 
    passport.authenticate('jwt', {session: false}),
    usersController.putName
)

router.put(
    '/:id/email', 
    passport.authenticate('jwt', {session: false}), 
    usersController.putEmail
)

router.delete(
    '/:id', 
    passport.authenticate('jwt', {session: false}), 
    usersController.deleteUser
)

module.exports = router