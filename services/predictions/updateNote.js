const db = require('../../models')

async function updateNote(source, note) {
    try {
        if (source) {
            const updatedPredictions = await db.Prediction.updateOne(
                {source: source},
                {$set: {note: note}}
            )
            return updatedPredictions
        } else {
            throw {
                code: 403,
                message: 'Source must be provided'
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = updateNote