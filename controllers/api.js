// Import external dependencies
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const passport = require('passport')

// Import internal middleware
const individuation = reqire('../middleware/individuation')

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
    const submission = {
        'title': req.body.title,
        'independent': req.body.independent,
        'dependent': req.body.dependent,
        'data_set': req.body.dataSet
    }
    try {
        await axios.post(
            regressionz + '?key=' + key + '&source=' + source,
            submission
        )
        res.status(200).json({msg: 'Data sent to API'})
    } catch (error) {
        res.status(400).json({msg: error})
    }
})

// Export router
module.exports = router