// Import external dependencies
const alert = require('alert')

// Import internal models
const db = require('../models')

// Import internal middleware
const generation = require('./generation')

// Define function
async function individuation() {
    const randomString = generation()
    console.log(`RANDOMSTRING: ${randomString}`)
    try {
        const foundPrediction = await db.Prediction.findOne({
            source: randomString
        })
        console.log(`FOUNDPREDICTION: ${foundPrediction}`)
        console.log(`FOUNDPREDICTION KEYS: ${Object.keys(foundPrediction)}`)
        console.log(`FOUNDPREDICTION._ID: ${foundPrediction._id}`)
        if (foundPrediction._id) {
            return individuation()
        } else {
            return randomString
        }
    } catch (error) {
        console.log(`ERROR: ${error}`)
        alert(error)
    }
}

// // Define function
// function individuation() {
//     const randomString = generation()
//     console.log(`RANDOMSTRING: ${randomString}`)
//     const locatedValue = location(randomString)
//     console.log(`LOCATEDVALUE: ${locatedValue}`)
//     console.log(`LOCATEDVALUE KEYS: ${Object.keys(locatedValue)}`)
//     if (locatedValue) {
//         return individuation()
//     } else {
//         return randomString
//     }
// }

// Export function
module.exports = individuation