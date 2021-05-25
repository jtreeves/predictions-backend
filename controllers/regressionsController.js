const createRegressions = require('../services/regressions/createRegressions')
const readRegressions = require('../services/regressions/readRegressions')
const updateRegressions = require('../services/regressions/updateRegressions')
const destroyRegressions = require('../services/regressions/destroyRegressions')
const individuation = require('../middleware/individuation')

const regressionsController = {}

regressionsController.postRegressions = async (req, res) => {
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
        res.status(error.code).json({msg: error.message})
    }
}

regressionsController.getRegressions = async (req, res) => {
    const source = req.params.source
    try {
        const regressions = await readRegressions(source)
        res.status(200).json({regressions: regressions})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Regressions information not retrieved'
        }
        res.status(error.code).json({msg: error.message})
    }
}

regressionsController.putRegressions = async (req, res) => {
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

regressionsController.deleteRegressions = async (req, res) => {
    const source = req.params.source
    try {
        const deletion = await destroyRegressions(source)
        res.status(204).json({msg: deletion})
    } catch (error) {
        if (!error.code) {
            error.code = 400
            error.message = 'Regressions not deleted'
        }
        res.status(error.code).json({msg: error.message})
    }
}

module.exports = regressionsController