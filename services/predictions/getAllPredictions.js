const db = require('../../models')

async function getAllPredictions(id) {
    try {
        const allPredictions = await db.Prediction.find({
            user: id
        })
        return allPredictions
    } catch (error) {
        throw error
    }
}

module.exports = getAllPredictions