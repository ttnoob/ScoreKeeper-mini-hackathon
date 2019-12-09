const mongoose = require('mongoose');

let Schema = mongoose.Schema

let classSchema = new Schema({
    className: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Class', classSchema);