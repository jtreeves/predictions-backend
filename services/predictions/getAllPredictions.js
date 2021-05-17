async function getAllPredictions(id) {
    try {
        const allPredictions = await db.Prediction.find({
            user: id
        })
        return allPredictions
    } catch (error) {
        return error
    }
}

module.exports = getAllPredictions