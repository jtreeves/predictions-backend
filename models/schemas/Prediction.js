// Import Mongoose
const mongoose = require('mongoose')

// Create variable for Schema shortcut
const Schema = mongoose.Schema

// Import schemas
const favoriteSchema = require('./subschemas/Favorite')
const noteSchema = require('./subschemas/Note')

// Create Prediction Schema
const predictionSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    source: String,
    sections: {
        favorite: favoriteSchema,
        note: noteSchema
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// Export Budget
module.exports = Prediction = mongoose.model('Prediction', predictionSchema)