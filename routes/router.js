const express = require('express')
const app = express.Router()
const Game = require('../models/game.js')

// swagger
var swagger = require('../swagger');
swagger(app);

// query user, class with and without params
/**
 * @swagger
 * /game/create:
 *  post:
 *      tags: 
 *          - API TAG
 *      name: Api create a game given players name
 *      summary: Api create game
 *      consumes:
 *          - application/json
 *      parameters:
 *          -   name: body
 *              in: body
 *              type: object
 *              required: true
 *              schema:
 *                  type: object
 *                  properties:
 *                      players: 
 *                          type : array
 *                          items: 
 *                              type: string
 *                          minItems: 4
 *                          maxItems: 4
 *                  example: {
 *                      "players" : ["Player 1", "Player 2", "Player 3", "Player 4"]
 *                  }
 *      responses:
 *          -   name: body
 *              in: body
 *              schema: 
 *                  type: object
 *                  properties:
 *                      success:
 *                          type: boolean
 *                      code :
 *                          type: number
 *                      message:
 *                          type: string
 *                      data:
 *                          type: object
 *                  example: {
 *                      "success" : true,
 *                      "code" : 200,
 *                      "message" : "OK",
 *                      "data" : {}
 *                  }   
 */
app.post('/game/create', (req, res) => {
    let players;

    let game = new Game({players: req.query.names});

    game.save(function (err, data) {
        if (err) {
            res.json({
                message: err.errors,
                success: false
            });
        } else {
            res.json({
                message: "New class created successfully, game id = " + this._id,
                success: true
            });
        }
    })
})

module.exports = app