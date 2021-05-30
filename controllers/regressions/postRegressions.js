const createRegressions = require('../../services/regressions/createRegressions')
const individuation = require('../../middleware/individuation')

async function postRegressions(req, res) {
    const submission = {
        'title': req.body.title,
        'independent': req.body.independent,
        'dependent': req.body.dependent,
        'precision': req.body.precision,
        'data_set': req.body.dataSet
    }
    const source = await individuation()
    try {
        const regressions = await createRegressions(
            source, submission
        )
        res.status(201).json({regressions: regressions})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Regressions not created'
        }
        console.log('ERROR IN POST REGRESSIONS: ', error)
        res.status(error.code).json({msg: error.message})
    }
}

module.exports = postRegressions