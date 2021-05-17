const db = require('../../models')

async function updateFavorite(source, favorite) {
    try {
        const updatedPredictions = await db.Prediction.updateOne(
            {source: source},
            {$set: {favorite: favorite}}
        )
        return updatedPredictions
    } catch (error) {
        throw error
    }
}

module.exports = updateFavorite