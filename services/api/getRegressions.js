const axios = require('axios')
const key = process.env.REGRESSIONZ_API_KEY
const regressionz = 'https://regressionz.herokuapp.com/api'

async function getRegressions(source) {
    try {
        const regressions = await axios.get(
            regressionz + '?key=' + key + '&source=' + source
        )
        return regressions.data
    } catch (error) {
        throw error
    }
}

module.exports = getRegressions