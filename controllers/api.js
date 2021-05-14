// Import external dependencies
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const passport = require('passport')

// Import internal models
const db = require('../models')

// Import internal middleware
const individuation = require('../middleware/individuation')

// Define constants
const key = process.env.REGRESSIONZ_API_KEY
const regressionz = 'https://regressionz.herokuapp.com/api'

// Create router
const router = express.Router()

// Create POST route for api/ (Private)
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const submission = {
        'title': req.body.title,
        'independent': req.body.independent,
        'dependent': req.body.dependent,
        'precision': req.body.precision,
        'data_set': req.body.dataSet
    }
    if (
        submission['title'] && 
        submission['independent'] && 
        submission['dependent'] && 
        submission['precision'] && 
        submission['data_set']
    ) {
        const source = individuation()
        await axios.post(
            regressionz + '?key=' + key + '&source=' + source,
            submission
        )
        const receivedRegressions = await axios.get(
            regressionz + '?key=' + key + '&source=' + source
        )
        res.status(200).json({regressions: receivedRegressions.data})
    }
})

// Create GET route for api/ (Private)
router.get('/:source', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const source = req.params.source
    if (source) {
        const receivedRegressions = await axios.get(
            regressionz + '?key=' + key + '&source=' + source
        )
        res.status(200).json({regressions: receivedRegressions.data})
    }
})

// Export router
module.exports = router