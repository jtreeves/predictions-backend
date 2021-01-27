// Import external dependencies
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const passport = require('passport')

// Import internal middleware
const individuation = require('../middleware/individuation')

// Import internal models
const db = require('../models')

// Define constants
const key = process.env.REGRESSIONZ_API_KEY
const regressionz = 'https://regressionz.herokuapp.com/api'

// Create router
const router = express.Router()

// Create GET route for api/ (Private)
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const source = individuation()
    console.log(`SOURCE: ${source}`)
    const submission = {
        'title': req.body.title,
        'independent': req.body.independent,
        'dependent': req.body.dependent,
        'data_set': req.body.dataSet
    }
    console.log(`SUBMISSION: ${submission}`)
    console.log(`SUBMISSION KEYS: ${Object.keys(submission)}`)
    try {
        await axios.post(
            regressionz + '?key=' + key + '&source=' + source,
            submission
        )
        const receivedRegressions = await axios.get(
            regressionz + '?key=' + key + '&source=' + source
        )
        console.log(`RECEIVEDREGRESSIONS: ${receivedRegressions}`)
        console.log(`RECEIVEDREGRESSIONS KEYS: ${Object.keys(receivedRegressions)}`)
        res.status(200).json({regressions: receivedRegressions})
    } catch (error) {
        console.log(`ERROR: ${error}`)
        console.log(`ERROR KEYS: ${Object.keys(error)}`)
        res.status(400).json({msg: error})
    }
})

// Export router
module.exports = router