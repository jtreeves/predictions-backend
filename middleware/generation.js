// Import external dependencies
const randomstring = require('randomstring')

// Define function
function generation() {
    randomstring.generate(10)
}

// Export function
module.exports = generation