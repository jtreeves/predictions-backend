const axios = require('axios')
const key = process.env.REGRESSIONZ_API_KEY
const regressionz = 'https://regressionz.herokuapp.com/api'
const individuation = require('../../utilities/individuation')

async function createRegressions(submission) {
    const source = await individuation()
    try {
        if (
            submission['title'] && 
            submission['independent'] && 
            submission['dependent'] && 
            submission['precision'] && 
            submission['data_set']
        ) {
            const regressions = await axios.post(
                regressionz + '?key=' + key + '&source=' + source,
                submission
            )
            return regressions.data
        } else {
            throw {
                code: 403,
                message: 'Title, independent, dependent, precision, and data set fields must all be provided'
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = createRegressions