const db = require('../../models')

async function updateNote(source, note) {
    try {
        const updatedPredictions = await db.Prediction.updateOne(
            {source: source},
            {$set: {note: note}}
        )
        return updatedPredictions
    } catch (error) {
        throw error
    }
}

module.exports = updateNote