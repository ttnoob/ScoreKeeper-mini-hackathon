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
    console.log("req.body: " + JSON.stringify(req.body));
    let game = new Game(req.body);
    game.save(function (err, data) {
        if (err) {
            res.json({
                message: err.errors,
                success: false
            });
        } else {
            res.json({
                message: "New game created successfully",
                gameId: data._id.toString(),
                success: true
            });
        }
    })
})
/**
 * @swagger
 * /game/get:
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
 *                      gameId: 
 *                          type: string
 *                  example: {
 *                      "gameId" : "5df269713777def6c378ed71"
 *                  }
 *      responses:
 *          -   name: body
 *              in: body
 *              schema: 
 *                  type: object
 *                  properties:
 *                      success:
 *                          type: boolean
 */
app.get('/game/get', (req, res) => {
    let players;
    console.log("req.query.gameId: " + req.query.gameId);
    let gameId = req.query.gameId;
    if (gameId) {
        let game = Game.findById(gameId, function (err, data) {
            if (err) {
                res.json({
                    message: err.errors,
                    success: false
                });
            } else {
                console.log("Game found: ", JSON.stringify(data));
                res.json({
                    game: data,
                    success: true
                });
            }
        });
    }
})

module.exports = app