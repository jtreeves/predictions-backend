// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Favorite Schema
const favoriteSchema = new Schema({
    graph: { 
        type: String, 
        default: ''
    },
    date: {
        type: Date,
        default: Date.now()
    },
}, { minimize: false })

// Export food
module.exports = favoriteSchema