const db = require('../../models')

async function updateFavorite(source, favorite) {
    try {
        if (source) {
            const updatedPredictions = await db.Prediction.updateOne(
                {source: source},
                {$set: {favorite: favorite}}
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

module.exports = updateFavorite