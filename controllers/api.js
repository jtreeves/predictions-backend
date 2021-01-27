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
        const foundPrediction = await db.Prediction.findOne({
            source: source
        })
        console.log(`FOUNDPREDICTION: ${foundPrediction}`)
        console.log(`FOUNDPREDICTION KEYS: ${Object.keys(foundPrediction)}`)
        console.log(`FOUNDPREDICTION._ID: ${foundPrediction._id}`)
        if (foundPrediction._id) {
            return false
        } else {
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
        }
    } catch (error) {
        console.log(`ERROR: ${error}`)
        res.status(400).json({msg: error})
    }
})

// // Create POST route for api/ (Private)
// router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
//     const source = individuation()
//     console.log(`SOURCE: ${source}`)
//     const submission = {
//         'title': req.body.title,
//         'independent': req.body.independent,
//         'dependent': req.body.dependent,
//         'data_set': req.body.dataSet
//     }
//     console.log(`SUBMISSION: ${submission}`)
//     console.log(`SUBMISSION KEYS: ${Object.keys(submission)}`)
//     try {
//         await axios.post(
//             regressionz + '?key=' + key + '&source=' + source,
//             submission
//         )
//         const receivedRegressions = await axios.get(
//             regressionz + '?key=' + key + '&source=' + source
//         )
//         console.log(`RECEIVEDREGRESSIONS: ${receivedRegressions}`)
//         console.log(`RECEIVEDREGRESSIONS KEYS: ${Object.keys(receivedRegressions)}`)
//         res.status(200).json({regressions: receivedRegressions})
//     } catch (error) {
//         console.log(`ERROR: ${error}`)
//         console.log(`ERROR KEYS: ${Object.keys(error)}`)
//         res.status(400).json({msg: error})
//     }
// })

// Export router
module.exports = router