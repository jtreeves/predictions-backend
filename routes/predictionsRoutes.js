const express = require('express')
const passport = require('passport')
const predictionsController = require('../controllers/predictionsController')

const router = express.Router()

router.post(
    '/:id', 
    passport.authenticate('jwt', {session: false}), 
    predictionsController.postPredictions
)

router.get(
    '/all/:id', 
    passport.authenticate('jwt', {session: false}), 
    predictionsController.getPredictions
)

router.put(
    '/:source/favorite', 
    passport.authenticate('jwt', {session: false}), 
    predictionsController.putFavorite
)

router.put(
    '/:source/note', 
    passport.authenticate('jwt', {session: false}), 
    predictionsController.putNote
)

router.delete(
    '/:source', 
    passport.authenticate('jwt', {session: false}), 
    predictionsController.deletePredictions
)

module.exports = router