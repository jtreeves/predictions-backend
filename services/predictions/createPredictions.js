const db = require('../../models')

async function createPredictions(id, source) {
    try {
        if (id) {
            if (source) {
                const predictions = await db.Prediction.create({
                    user: id,
                    source: source
                })
                return predictions
            } else {
                throw {
                    code: 403,
                    message: 'Source must be provided'
                }
            }
        } else {
            throw {
                code: 403,
                message: 'ID must be provided'
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = createPredictions