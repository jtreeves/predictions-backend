// Import external dependencies
const alert = require('alert')

// Import internal models
const db = require('../models')

// Define function
async function location(testString) {
    console.log(`TESTSTRING: ${testString}`)
    try {
        const foundPrediction = await db.Prediction.findOne({
            source: testString
        })
        console.log(`FOUNDPREDICTION: ${foundPrediction}`)
        console.log(`FOUNDPREDICTION KEYS: ${Object.keys(foundPrediction)}`)
        console.log(`FOUNDPREDICTION._ID: ${foundPrediction._id}`)
        if (foundPrediction._id) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(`LOCATION ERROR: ${error}`)
        alert(error)
    }
}

// Export function
module.exports = location