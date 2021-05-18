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
    if (
        submission['title'] && 
        submission['independent'] && 
        submission['dependent'] && 
        submission['precision'] && 
        submission['data_set']
    ) {
        const source = await individuation()
        try {
            const regressions = await createRegressions(
                source, submission
            )
            res.status(201).json({regressions: regressions})
        } catch (error) {
            res.status(400).json({msg: error})
        }
    } else {
        res.status(403).json({msg: 'Title, independent, dependent, precision, and dataSet fields are all required'})
    }
}

regressionsController.getRegressions = async (req, res) => {
    const source = req.params.source
    if (source) {
        try {
            const regressions = await readRegressions(source)
            res.status(200).json({regressions: regressions})
        } catch (error) {
            res.status(400).json({msg: error})
        }
    } else {
        res.status(403).json({msg: 'Source must be provided'})
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
    if (
        source &&
        submission['title'] && 
        submission['independent'] && 
        submission['dependent'] && 
        submission['precision'] && 
        submission['data_set']
    ) {
        try {
            const regressions = await updateRegressions(
                source, submission
            )
            res.status(200).json({regressions: regressions})
        } catch (error) {
            res.status(400).json({msg: error})
        }
    } else {
        res.status(403).json({msg: 'Title, independent, dependent, precision, and dataSet fields are all required, and source must be provided'})
    }
}

regressionsController.deleteRegressions = async (req, res) => {
    const source = req.params.source
    if (source) {
        try {
            const deletion = await destroyRegressions(source)
            res.status(204).json({msg: deletion})
        } catch (error) {
            res.status(400).json({msg: error})
        }
    } else {
        res.status(403).json({msg: 'Source must be provided'})
    }
}

module.exports = regressionsController