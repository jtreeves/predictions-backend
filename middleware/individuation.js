const db = require('../models')
const generation = require('./generation')

async function individuation() {
    const source = generation()
    const foundPrediction = await db.Prediction.findOne({
        source: source
    })
    if (foundPrediction) {
        individuation()
    } else {
        return true
    }
}

module.exports = individuation