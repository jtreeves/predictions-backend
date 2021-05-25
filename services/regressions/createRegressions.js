const axios = require('axios')
const key = process.env.REGRESSIONZ_API_KEY
const regressionz = 'https://regressionz.herokuapp.com/api'

async function createRegressions(source, submission) {
    try {
        if (source) {
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

module.exports = createRegressions