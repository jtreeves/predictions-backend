const createRegressions = require('../../services/regressions/createRegressions')

async function postRegressions(req, res) {
    const submission = {
        'title': req.body.title,
        'independent': req.body.independent,
        'dependent': req.body.dependent,
        'precision': req.body.precision,
        'data_set': req.body.dataSet
    }
    try {
        const regressions = await createRegressions(
            submission
        )
        res.status(201).json({regressions: regressions})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Regressions not created'
        }
        res.status(error.code).json({msg: error.message})
    }
}

module.exports = postRegressions