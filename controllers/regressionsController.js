const postRegressions = require('./regressions/postRegressions')
const getRegressions = require('./regressions/getRegressions')
const putRegressions = require('./regressions/putRegressions')
const deleteRegressions = require('./regressions/deleteRegressions')

const regressionsController = {
    postRegressions,
    getRegressions,
    putRegressions,
    deleteRegressions
}

module.exports = regressionsController