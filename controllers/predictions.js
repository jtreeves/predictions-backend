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
    try {
        const newPrediction = await db.Prediction.create({
            user: req.params.id,
            source: req.body.source
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

// Create PUT route for predictions/:source/favorite
router.put('/:source/favorite', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const updatedPredictions = await db.Prediction.updateOne(
            {source: req.params.source},
            {$set: {favorite: req.body.favorite}}
        )
        res.status(200).json({predictions: updatedPredictions})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create PUT route for predictions/:source/note
router.put('/:source/note', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const updatedPredictions = await db.Prediction.updateOne(
            {source: req.params.source},
            {$set: {note: req.body.note}}
        )
        res.status(200).json({predictions: updatedPredictions})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Create DELETE route for predictions/:source
router.delete('/:source', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        await db.Prediction.deleteOne({source: req.params.source})
        res.status(200).json({msg: 'Predictions deleted'})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// Export router
module.exports = router