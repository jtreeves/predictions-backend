const db = require('../../models')

async function updateNote(source, note) {
    try {
        if (source && note) {
            const updatedPredictions = await db.Prediction.updateOne(
                {source: source},
                {$set: {note: note}}
            )
            return updatedPredictions
        } else {
            throw {
                code: 403,
                message: 'Source and note must both be provided'
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = updateNote