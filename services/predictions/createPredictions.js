const db = require('../../models')

async function createPredictions(id, source) {
    try {
        const predictions = await db.Prediction.create({
            user: id,
            source: source
        })
        return predictions
    } catch (error) {
        return error
    }
}

module.exports = createPredictions