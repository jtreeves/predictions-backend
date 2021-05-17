const axios = require('axios')
const key = process.env.REGRESSIONZ_API_KEY
const regressionz = 'https://regressionz.herokuapp.com/api'

async function updateRegressions(source, submission) {
    try {
        const regressions = await axios.put(
            regressionz + '?key=' + key + '&source=' + source,
            submission
        )
        return regressions.data
    } catch (error) {
        return error
    }
}

module.exports = updateRegressions