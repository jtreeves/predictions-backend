const express = require('express')
const passport = require('passport')
const regressionsController = require('../controllers/regressionsController')

const router = express.Router()

router.post(
    '/', 
    passport.authenticate('jwt', {session: false}),
    regressionsController.postRegressions
)

router.get(
    '/:source', 
    passport.authenticate('jwt', {session: false}), 
    regressionsController.getRegressions
)

router.put(
    '/:source', 
    passport.authenticate('jwt', {session: false}), 
    regressionsController.putRegressions
)

router.delete(
    '/:source', 
    passport.authenticate('jwt', {session: false}), 
    regressionsController.deleteRegressions
)

module.exports = router