async function deleteRegressions(source) {
    try {
        await axios.delete(
            regressionz + '?key=' + key + '&source=' + source
        )
        return 'Regressions deleted'
    } catch (error) {
        return error
    }
}

module.exports = deleteRegressions