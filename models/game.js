const mongoose = require('mongoose');

let Schema = mongoose.Schema

let gameSchema = new Schema({
    playerName: [{
        type: {
            type: String,
            require: true
        },
        validate: [checkNumberOfPlayers, 'Number of Players should be 4']
    }],
    round: [{
        type: Array,
        default: null
    }],
    result: {
        type: Array,
        default: null
    }
})

function checkNumberOfPlayers(val) {
    val.length == 4;
}

module.exports = mongoose.model('Class', classSchema);
