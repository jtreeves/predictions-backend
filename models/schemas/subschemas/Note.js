// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Note Schema
const noteSchema = new Schema({
    comments: { 
        type: Schema.Types.Mixed, 
        default: {} 
    },
    date: {
        type: Date,
        default: Date.now()
    },
}, { minimize: false })

// Export food
module.exports = noteSchema