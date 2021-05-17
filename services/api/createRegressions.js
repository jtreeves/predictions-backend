async function createRegressions(source, submission) {
    try {
        const regressions = await axios.post(
            regressionz + '?key=' + key + '&source=' + source,
            submission
        )
        
        return regressions.data
    } catch (error) {
        return error
    }
}

module.exports = createRegressions