const db = require('../../models')

async function createPredictions(id, source) {
    try {
        if (id && source) {
            const predictions = await db.Prediction.create({
                user: id,
                source: source
            })
            return predictions
        } else {
            throw {
                code: 403,
                message: 'ID and source must both be provided'
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = createPredictions