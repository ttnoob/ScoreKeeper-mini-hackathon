const mongoose = require('mongoose');

let Schema = mongoose.Schema

let gameSchema = new Schema({
    playerName: {
        type: Array,
        required: [true, 'Player name is required']
    },
    round: [{
        type: Array,
        default: null
    }],
    result: {
        type: Array,
        default: null
    }
})

module.exports = mongoose.model('Game', gameSchema);