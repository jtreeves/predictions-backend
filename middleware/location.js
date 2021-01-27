// Import external dependencies
const alert = require('alert')

// Import internal models
const db = require('../models')

// Define function
async function location(testString) {
    try {
        const foundPrediction = await db.Prediction.findOne({
            source: testString
        })
        if (foundPrediction._id) {
            return true
        } else {
            return false
        }
    } catch (error) {
        alert(error)
    }
}

// Export function
module.exports = location