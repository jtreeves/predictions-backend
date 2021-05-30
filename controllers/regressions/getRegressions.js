const readRegressions = require('../../services/regressions/readRegressions')

async function getRegressions(req, res) {
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

module.exports = getRegressions