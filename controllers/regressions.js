// Import external dependencies
require('dotenv').config()
const express = require('express')
const passport = require('passport')

// Import internal middleware
const individuation = require('../middleware/individuation')
const createRegressions = require('../services/regressions/createRegressions')
const getRegressions = require('../services/regressions/getRegressions')
const updateRegressions = require('../services/regressions/updateRegressions')
const deleteRegressions = require('../services/regressions/deleteRegressions')

// Create router
const router = express.Router()

// Create POST route for api/ (Private)
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
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
})

// Create GET route for api/ (Private)
router.get('/:source', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const source = req.params.source
    if (source) {
        try {
            const regressions = await getRegressions(source)
            res.status(200).json({regressions: regressions})
        } catch (error) {
            res.status(400).json({msg: error})
        }
    } else {
        res.status(403).json({msg: 'Source must be provided'})
    }
})

// Create PUT route for api/ (Private)
router.put('/:source', passport.authenticate('jwt', {session: false}), async (req, res) => {
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
})

// Create DELETE route for api/ (Private)
router.delete('/:source', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const source = req.params.source
    if (source) {
        try {
            const deletion = await deleteRegressions(source)
            res.status(204).json({msg: deletion})
        } catch (error) {
            res.status(400).json({msg: error})
        }
    } else {
        res.status(403).json({msg: 'Source must be provided'})
    }
})

// Export router
module.exports = router