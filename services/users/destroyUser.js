const db = require('../../models')

const destroyPrediction = require('../predictions/destroyPredictions')
const readAllPredictions = require('../predictions/readAllPredictions')

async function destroyUser(id) {
    try {
        const allPredictions = await readAllPredictions(id)
        for (const prediction of allPredictions) {
            await destroyPrediction(prediction.source)
        }
        await db.User.deleteOne({_id: id})
        return 'User deleted'
    } catch (error) {
        throw error
    }
}

module.exports = destroyUser