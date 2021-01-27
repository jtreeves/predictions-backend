const generation = require('./generation')
const location = require('./location')

// Define function
function individuation() {
    const randomString = generation()
    const locatedValue = location(randomString)
    if (locatedValue) {
        return individuation()
    } else {
        return randomString
    }
}

// Export function
module.exports = individuation