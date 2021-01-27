const generation = require('./generation')
const location = require('./location')

// Define function
function individuation() {
    const randomString = generation()
    console.log(`RANDOMSTRING: ${randomString}`)
    const locatedValue = location(randomString)
    console.log(`LOCATEDVALUE: ${locatedValue}`)
    console.log(`LOCATEDVALUE KEYS: ${Object.keys(locatedValue)}`)
    if (locatedValue) {
        return individuation()
    } else {
        return randomString
    }
}

// Export function
module.exports = individuation