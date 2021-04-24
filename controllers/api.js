// Import external dependencies
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const passport = require('passport')

// Import internal models
const db = require('../models')

// Import internal middleware
const generation = require('../middleware/generation')

// Define constants
const key = process.env.REGRESSIONZ_API_KEY
const regressionz = 'https://regressionz.herokuapp.com/api'

// Create router
const router = express.Router()

// Create POST route for api/ (Private)
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const source = generation()
    const submission = {
        'title': req.body.title,
        'independent': req.body.independent,
        'dependent': req.body.dependent,
        'precision': req.body.precision,
        'data_set': JSON.parse(req.body.dataSet)
    }
    const foundPrediction = await db.Prediction.findOne({
        source: source
    })
    if (foundPrediction == null) {
        await axios.post(
            regressionz + '?key=' + key + '&source=' + source,
            submission
        )
        const receivedRegressions = await axios.get(
            regressionz + '?key=' + key + '&source=' + source
        )
        res.status(200).json({regressions: receivedRegressions.data})
    } else {
        return false
    }
})

// Export router
module.exports = router