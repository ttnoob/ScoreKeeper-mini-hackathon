const express = require('express')
const app = express.Router()
const Game = require('../models/game.js')


// query user, class with and without params
app.post('/game/create', (req, res) => {
    let players;

    let game = new Game({players: req.query.names});

    newClass.save(function (err, data) {
        if (err) {
            res.json({
                message: err.errors,
                success: false
            });
        } else {
            res.json({
                message: "New class created successfully",
                success: true
            });
        }
    })
})

module.exports = app