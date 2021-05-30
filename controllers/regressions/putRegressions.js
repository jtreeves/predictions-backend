const updateRegressions = require('../../services/regressions/updateRegressions')

async function putRegressions(req, res) {
    const source = req.params.source
    const submission = {
        'title': req.body.title,
        'independent': req.body.independent,
        'dependent': req.body.dependent,
        'precision': req.body.precision,
        'data_set': req.body.dataSet
    }
    try {
        const regressions = await updateRegressions(
            source, submission
        )
        res.status(200).json({regressions: regressions})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Regressions not updated'
        }
        res.status(error.code).json({msg: error.message})
    }
}

module.exports = putRegressions