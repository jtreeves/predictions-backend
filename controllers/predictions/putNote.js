const updateNote = require('../../services/predictions/updateNote')

async function putNote(req, res) {
    const source = req.params.source
    const note = req.body.note
    try {
        const updatedPredictions = await updateNote(source, note)
        res.status(200).json({predictions: updatedPredictions})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Note not updated'
        }
        res.status(error.code).json({msg: error.message})
    }
}

module.exports = putNote