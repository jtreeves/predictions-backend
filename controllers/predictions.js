// Import external dependencies
require('dotenv').config()
const express = require('express')
const passport = require('passport')

// Import internal models
const db = require('../models')

// Create router
const router = express.Router()

// Create POST route for predictions/:id
router.post('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const { favorite, note } = req.body.sections
    try {
        const newPrediction = await db.Prediction.create({
            user: req.params.id,
            regression: req.body.regression,
            title: req.body.title,
            sections: {
                favorite: {graph: favorite.graph},
                note: {comments: note.comments}
            }
        })
        res.status(200).json({prediction: newPrediction})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for predictions/all/:id
router.get('/all/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const allPredictions = await db.Prediction.find({
            user: req.params.id
        })
        res.status(200).json({predictions: allPredictions})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for predictions/:id
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const currentPrediction = await db.Prediction.findOne({
            _id: req.params.id
        })
        res.status(200).json({prediction: currentPrediction})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Export router
module.exports = router