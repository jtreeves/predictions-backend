const axios = require('axios')
const key = process.env.REGRESSIONZ_API_KEY
const regressionz = 'https://regressionz.herokuapp.com/api'

async function createRegressions(source, submission) {
    try {
        const regressions = await axios.post(
            regressionz + '?key=' + key + '&source=' + source,
            submission
        )
        return regressions.data
    } catch (error) {
        throw error
    }
}

module.exports = createRegressions