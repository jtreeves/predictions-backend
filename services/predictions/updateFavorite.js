async function updateFavorite(source, favorite) {
    try {
        const updatedPredictions = await db.Prediction.updateOne(
            {source: source},
            {$set: {favorite: favorite}}
        )
        return updatedPredictions
    } catch (error) {
        return error
    }
}

module.exports = updateFavorite