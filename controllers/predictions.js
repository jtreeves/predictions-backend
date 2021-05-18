// Import external dependencies
require('dotenv').config()
const express = require('express')
const passport = require('passport')

// Import internal services
const createPredictions = require('../services/predictions/createPredictions')
const deletePredictions = require('../services/predictions/deletePredictions')
const getAllPredictions = require('../services/predictions/getAllPredictions')
const updateFavorite = require('../services/predictions/updateFavorite')
const updateNote = require('../services/predictions/updateNote')

// Create router
const router = express.Router()

// Create POST route for predictions/:id
router.post('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const predictions = await createPredictions(
            req.params.id, req.params.source
        )
        res.status(201).json({prediction: predictions})
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Create GET route for predictions/all/:id
router.get('/all/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const collatedData = await getAllPredictions(req.params.id)
        res.status(200).json({collections: collatedData})
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Create PUT route for predictions/:source/favorite
router.put('/:source/favorite', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const updatedPredictions = await updateFavorite(
            req.params.source, req.body.favorite
        )
        res.status(200).json({predictions: updatedPredictions})
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Create PUT route for predictions/:source/note
router.put('/:source/note', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const updatedPredictions = await updateNote(
            req.params.source, req.body.note
        )
        res.status(200).json({predictions: updatedPredictions})
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Create DELETE route for predictions/:source
router.delete('/:source', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const deletion = await deletePredictions(req.params.source)
        res.status(204).json({msg: deletion})
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Export router
module.exports = router