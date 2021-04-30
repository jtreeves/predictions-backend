// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Create Prediction Schema
const predictionSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    source: String,
    favorite: { 
        type: String, 
        default: ''
    },
    note: { 
        type: String, 
        default: ''
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// Export Budget
module.exports = Prediction = mongoose.model('Prediction', predictionSchema)