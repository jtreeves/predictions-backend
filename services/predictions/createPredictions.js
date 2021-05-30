const db = require('../../models')

async function createPredictions(id, source) {
    try {
        console.log('ID IN CREATE PREDICTIONS: ', id)
        console.log('SOURCE IN CREATE PREDICTIONS: ', source)
        if (id) {
            if (source) {
                const predictions = await db.Prediction.create({
                    user: id,
                    source: source
                })
                console.log('RESULT OF CREATE PREDICTIONS: ', predictions)
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