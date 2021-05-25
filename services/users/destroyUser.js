const db = require('../../models')

const destroyPrediction = require('../predictions/destroyPredictions')
const readAllPredictions = require('../predictions/readAllPredictions')

async function destroyUser(id) {
    try {
        const allCollections = await readAllPredictions(id)
        for (const collection of allCollections) {
            await destroyPrediction(collection.prediction.source)
        }
        await db.User.deleteOne({_id: id})
        return 'User deleted'
    } catch (error) {
        throw error
    }
}

module.exports = destroyUser