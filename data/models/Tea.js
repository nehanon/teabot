const mongoose = require('mongoose')

const teaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    tags: {
        type: [String]
    }
})

const Tea = mongoose.model('Tea', teaSchema)

module.exports = Tea