const updateFavorite = require('../../services/predictions/updateFavorite')

async function putFavorite(req, res) {
    const source = req.params.source
    const favorite = req.body.favorite
    try {
        const updatedPredictions = await updateFavorite(source, favorite)
        res.status(200).json({predictions: updatedPredictions})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Favorite not updated'
        }
        res.status(error.code).json({msg: error.message})
    }
}

module.exports = putFavorite