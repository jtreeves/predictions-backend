const axios = require('axios')
const key = process.env.REGRESSIONZ_API_KEY
const regressionz = 'https://regressionz.herokuapp.com/api'

async function readRegressions(source) {
    try {
        if (source) {
            const regressions = await axios.get(
                regressionz + '?key=' + key + '&source=' + source
            )
            return regressions.data
        } else {
            throw {
                code: 403,
                message: 'Source must be provided'
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = readRegressions