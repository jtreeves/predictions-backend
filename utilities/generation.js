// Import external dependencies
const randomstring = require('randomstring')

// Define function
function generation() {
    const generatedString = randomstring.generate(10)
    return generatedString
}

// Export function
module.exports = generation