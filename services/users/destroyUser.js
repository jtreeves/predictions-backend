const db = require('../../models')
const readAllPredictions = require('../predictions/readAllPredictions')
const destroyPrediction = require('../predictions/destroyPredictions')

async function destroyUser(id) {
    try {
        if (id) {
            const allCollections = await readAllPredictions(id)
            for (const collection of allCollections) {
                await destroyPrediction(collection.prediction.source)
            }
            await db.User.deleteOne({_id: id})
            return 'User deleted'
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

module.exports = destroyUser