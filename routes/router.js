const express = require('express')
const app = express.Router()
const Game = require('../models/game')
// const Util = require('../middleware/searchSingleObject')

async function getGame(req, res, next) {
    try {
        game = await Game.findById(req.params.id).populate('_class')
        if (game == null) {
            return res.status(404).json({ message: 'Cant find game'})
        }
    } catch(err){
        return res.status(500).json({ message: err.message })
    }
  
    res.game = game
    next()
}

// create game (post)
app.post('/game', (req, res) => {
    const newGame = new Game(req.body);
    newGame.save((err, data) => {
        console.log(data._id)
        if (err) {
            res.json({
                message: err,
                success: false
            })
        } else {
            res.json({
                message: 'success',
                data: data._id,
                sucesss: true
            })
        }
    })
})

// query game single id (get)
// app.get('/user/:id', Util.getUser, (req, res) => {
//     res.json(res.user);
// })
app.get('/game/:id', getGame, (req, res) => {
    res.json(res.game);
})

// modify round of player
app.put('/game/:id/:rowIndex/:columnIndex', getGame, async (req, res) => {
    if (!req.params.id || !req.params.rowIndex || !req.params.columnIndex) {
        res.json({
            message: 'empty Id',
            success: false
        })
        return;
    }
    console.log(res.game)
    if (req.body['round'] != null) {
        res.game['round'][rowIndex][columnIndex] = re
        req.body['round'][0] = 0
        req.body['round'][1] = 0
        req.body['round'][2] = 0
        req.body['round'][3] = 0
        res.game['round'].push(req.body['round'])
    } else {
        res.status(400).json({ message: err.message })
        return;
    }
    // for (let arrChild of req.body['round']) {
    //     res.game['result'][0] += arrChild[0]
    //     res.game['result'][1] += arrChild[1]
    //     res.game['result'][2] += arrChild[2]
    //     res.game['result'][3] += arrChild[3]
    // }
    try {
        const updatedGame = await res.game.save()
        res.json(updatedGame)
    } catch {
        res.status(400).json({ message: err.message })
    }
})

// add round (put game)
app.put('/game/:id', getGame, async (req, res) => {
    if (!req.params.id) {
        res.json({
            message: 'empty Id',
            success: false
        })
        return;
    }
    console.log(res.game)
    if (req.body['round'] != null) {
        req.body['round'][0] = 0
        req.body['round'][1] = 0
        req.body['round'][2] = 0
        req.body['round'][3] = 0
        res.game['round'].push(req.body['round'])
    } else {
        res.status(400).json({ message: err.message })
        return;
    }
    // for (let arrChild of req.body['round']) {
    //     res.game['result'][0] += arrChild[0]
    //     res.game['result'][1] += arrChild[1]
    //     res.game['result'][2] += arrChild[2]
    //     res.game['result'][3] += arrChild[3]
    // }
    try {
        const updatedGame = await res.game.save()
        res.json(updatedGame)
    } catch {
        res.status(400).json({ message: err.message })
    }
})

// add round (put game) + modify result
// app.put('/game/:id', getGame, (req, res) => {
//     if (!req.params.id) {
//         res.json({
//             message: 'empty Id',
//             success: false
//         })
//         return;
//     }
//     if (req.body['playerName'] != null) {
//         res.game['playerName'] = req.body['playerName']
//     } else {
//         res.status(400).json({ message: err.message })
//         return;
//     }
//     if (req.body['round'] != null) {
//         res.game['round'].push(req.body['round'])
//     } else {
//         res.status(400).json({ message: err.message })
//         return;
//     }
//     for (let arrChild of req.body['round']) {
//         res.game['result'][0] += arrChild[0]
//         res.game['result'][1] += arrChild[1]
//         res.game['result'][2] += arrChild[2]
//         res.game['result'][3] += arrChild[3]
//     }
//     for (const property in req.body) {
//         if (req.body[property] != null) {
//             res.game[property] = req.body[property]
//         } else {
//             res.status(400).json({ message: err.message })
//             return;
//         }
//     }
//     try {
//         const updatedGame = await res.game.save()
//         res.json(updatedGame)
//     } catch {
//         res.status(400).json({ message: err.message })
//     }
// })

// query user, class with and without params
// app.get('/user', (req, res) => {
//     let users;
//     if (req.query.name) {
//         users = User.find({
//             name: req.query.name
//         })
//     } else {
//         users = User.find()
//     }
//     if (req.query.className) {
//         console.log(1);
//         users.populate({
//             path: '_class',
//             match: {
//                 className: req.query.className
//             }
//         }).exec((err, data) => {
//             let result = data.filter((value, index, array) => {
//                 return value._class.length > 0 ? value : null
//             })

//             console.log(result)
//             if (result.length <= 0) {
//                 res.json({
//                     message: "user not found",
//                     sucesss: false
//                 })
//                 return;
//             }
//             if (err) {
//                 res.json({
//                     message: err,
//                     sucesss: false
//                 })
//             } else {
//                 res.json({
//                     message: 'user found',
//                     data: data,
//                     sucesss: true
//                 })
//             }
//         });
//     } else {
//         console.log(2);
//         users.populate('_class')
//         .exec((err, data) => {
//             // console.log(data)
//             if (data.length <= 0) {
//                 res.json({
//                     message: "user not found",
//                     sucesss: false
//                 })
//                 return;
//             }
//             if (err) {
//                 res.json({
//                     message: err,
//                     sucesss: false
//                 })
//             } else {
//                 res.json({
//                     message: 'user found',
//                     data: data,
//                     sucesss: true
//                 })
//             }
//         });
//     }
// })

// app.get('/class', (req, res) => {
//     let classes;
//     if (req.query.className) {
//         classes = Class.find({
//             name: req.query.className
//         })
//     } else {
//         classes = Class.find()
//     }
//     classes.exec((err, data) => {
//         if (data.length <= 0) {
//             res.json({
//                 message: "class not found",
//                 sucesss: false
//             })
//             return;
//         }
//         if (err) {
//             res.json({
//                 message: err,
//                 sucesss: false
//             })
//         } else {
//             res.json({
//                 message: 'class found',
//                 data: data,
//                 sucesss: true
//             })
//         }
//     });
// })

// // query single user, class
// app.get('/user/:id', Util.getUser, (req, res) => {
//     res.json(res.user);
// })

// app.post('/user', (req, res) => {
//     const newUser = new User(req.body);
//     newUser.save((err, data) => {
//         if (err) {
//             res.json({
//                 message: err,
//                 sucesss: false
//             })
//         } else {
//             res.json({
//                 message: err,
//                 sucesss: true
//             })
//         }
//     })
// })

// app.post('/class', (req, res) => {
//     const newClass = new Class(req.body);
//     newClass.save((err, data) => {
//         if (err) {
//             res.json({
//                 message: err,
//                 sucesss: false
//             })
//         } else {
//             res.json({
//                 message: "class created",
//                 sucesss: true
//             })
//         }
//     })
// })

// app.delete('/user/:id', Util.getUser, (req, res) => {
//     try {
//         res.user.remove()
//         res.json({ message: 'deleted this user' })
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })

// app.delete('/class/:id', Util.getClass, (req, res) => {
//     try {
//         res.oneClass.remove()
//         res.json({ message: 'deleted this class' })
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })

// app.put('/user/:id', Util.getUser, async (req, res) => {
//     if (!req.params.id) {
//         res.json({
//             message: 'empty Id',
//             success: false
//         })
//         return;
//     }
//     for (const property in req.body) {
//         if (req.body[property] != null) {
//             res.user[property] = req.body[property]
//         } else {
//             res.status(400).json({ message: err.message })
//             return;
//         }
//     }
//     try {
//         const updatedUser = await res.user.save()
//         res.json(updatedUser)
//     } catch {
//         res.status(400).json({ message: err.message })
//     }
// })

// app.put('/class/:id', Util.getClass, async (req, res) => {
//     if (!req.params.id) {
//         res.json({
//             message: 'empty Id',
//             success: false
//         })
//         return;
//     }
//     for (const property in req.body) {
//         if (req.body[property] != null) {
//             res.oneClass[property] = req.body[property]
//         } else {
//             res.status(400).json({ message: err.message })
//             return;
//         }
//     }
//     try {
//         const updatedClass = await res.oneClass.save()
//         res.json(updatedClass)
//     } catch {
//         res.status(400).json({ message: err.message })
//     }
// })

module.exports = app 
