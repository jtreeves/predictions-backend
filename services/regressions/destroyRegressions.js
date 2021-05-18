const axios = require('axios')
const key = process.env.REGRESSIONZ_API_KEY
const regressionz = 'https://regressionz.herokuapp.com/api'

async function destroyRegressions(source) {
    try {
        await axios.delete(
            regressionz + '?key=' + key + '&source=' + source
        )
        return 'Regressions deleted'
    } catch (error) {
        throw error
    }
}

module.exports = destroyRegressions