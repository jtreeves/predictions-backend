const db = require('../../models')

const getRegressions = require("../api/getRegressions")

async function getPredictions(source) {
    try {
        const predictions = await db.Prediction.findOne({
            source: source
        })
        const regressions = await getRegressions(source)
        return { predictions, regressions }
    } catch (error) {
        throw error
    }
}

module.exports = getPredictions