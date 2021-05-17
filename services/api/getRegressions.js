async function getRegressions(source) {
    try {
        const regressions = await axios.get(
            regressionz + '?key=' + key + '&source=' + source
        )
        return regressions.data
    } catch (error) {
        return error
    }
}

module.exports = getRegressions