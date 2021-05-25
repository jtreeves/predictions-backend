const axios = require('axios')
const key = process.env.REGRESSIONZ_API_KEY
const regressionz = 'https://regressionz.herokuapp.com/api'

async function destroyRegressions(source) {
    try {
        if (source) {
            await axios.delete(
                regressionz + '?key=' + key + '&source=' + source
            )
            return 'Regressions deleted'
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

module.exports = destroyRegressions