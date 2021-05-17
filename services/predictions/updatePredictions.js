const db = require('../../models')

const updateRegressions = require("../api/updateRegressions")
const updateFavorite = require("./updateFavorite")
const updateNote = require("./updateNote")

async function updatedPredictions(source, submission, favorite, note) {
    try {
        await updateFavorite(source, favorite)
        const predictions = await updateNote(source, note)
        const regressions = await updateRegressions(source, submission)
        return { predictions, regressions }
    } catch (error) {
        throw error
    }
}

module.exports = updatedPredictions