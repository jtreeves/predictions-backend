const db = require('../../models')

const deletePrediction = require('../predictions/deletePredictions')
const getAllPredictions = require('../predictions/getAllPredictions')

async function deleteUser(id) {
    try {
        const allPredictions = await getAllPredictions(id)
        for (const prediction of allPredictions) {
            await deletePrediction(prediction.source)
        }
        await db.User.deleteOne({_id: id})
        return 'User deleted'
    } catch (error) {
        throw error
    }
}

module.exports = deleteUser