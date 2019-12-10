const mongoose = require('mongoose');

let Schema = mongoose.Schema

let gameSchema = new Schema({
    players: {
        type: [{
            type: String,
            require: true
        }],
        validate: [checkNumberOfPlayers, 'Number of Players should be 4'],
        required: true
    }
})

function checkNumberOfPlayers(val) {
    val.length == 4;
}

module.exports = mongoose.model('Class', classSchema);