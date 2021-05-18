const db = require('../../models')
const getRegressions = require('../regressions/getRegressions')

async function getAllPredictions(id) {
    try {
        const allPredictions = []
        const predictions = await db.Prediction.find({
            user: id
        })
        for (const prediction of predictions) {
            const regression = await getRegressions(
                prediction.source
            )
            allPredictions.push({prediction, regression})
        }
        return allPredictions
    } catch (error) {
        throw error
    }
}

module.exports = getAllPredictions