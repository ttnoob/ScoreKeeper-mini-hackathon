const mongoose = require('mongoose');

let Schema = mongoose.Schema

function checkNumberOfPlayers(val) {
    return val.length == 4;
}

let gameSchema = new Schema({
    players: {
        type: [{
            type: String,
            require: true
        }],
        validate: {
            validator: checkNumberOfPlayers,
            message: 'Number of Players should be 4'
        },
        required: true
    }
})


module.exports = mongoose.model('Game', gameSchema);