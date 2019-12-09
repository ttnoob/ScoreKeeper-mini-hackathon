const express = require('express')
const app = express.Router()
const User = require('../models/user')
const Class = require('../models/class')
const Util = require('../middleware/searchSingleObject')


// query user, class with and without params
app.get('/user', (req, res) => {
    let users;
    if (req.query.name) {
        users = User.find({
            name: req.query.name
        })
    } else {
        users = User.find()
    }
    if (req.query.className) {
        console.log(1);
        users.populate({
            path: '_class',
            match: {
                className: req.query.className
            }
        }).exec((err, data) => {
            let result = data.filter((value, index, array) => {
                return value._class.length > 0 ? value : null
            })

            console.log(result)
            if (result.length <= 0) {
                res.json({
                    message: "user not found",
                    sucesss: false
                })
                return;
            }
            if (err) {
                res.json({
                    message: err,
                    sucesss: false
                })
            } else {
                res.json({
                    message: 'user found',
                    data: data,
                    sucesss: true
                })
            }
        });
    } else {
        console.log(2);
        users.populate('_class')
        .exec((err, data) => {
            // console.log(data)
            if (data.length <= 0) {
                res.json({
                    message: "user not found",
                    sucesss: false
                })
                return;
            }
            if (err) {
                res.json({
                    message: err,
                    sucesss: false
                })
            } else {
                res.json({
                    message: 'user found',
                    data: data,
                    sucesss: true
                })
            }
        });
    }
})

app.get('/class', (req, res) => {
    let classes;
    if (req.query.className) {
        classes = Class.find({
            name: req.query.className
        })
    } else {
        classes = Class.find()
    }
    classes.exec((err, data) => {
        if (data.length <= 0) {
            res.json({
                message: "class not found",
                sucesss: false
            })
            return;
        }
        if (err) {
            res.json({
                message: err,
                sucesss: false
            })
        } else {
            res.json({
                message: 'class found',
                data: data,
                sucesss: true
            })
        }
    });
})

// query single user, class
app.get('/user/:id', Util.getUser, (req, res) => {
    res.json(res.user);
})

app.post('/user', (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err, data) => {
        if (err) {
            res.json({
                message: err,
                sucesss: false
            })
        } else {
            res.json({
                message: err,
                sucesss: true
            })
        }
    })
})

app.post('/class', (req, res) => {
    const newClass = new Class(req.body);
    newClass.save((err, data) => {
        if (err) {
            res.json({
                message: err,
                sucesss: false
            })
        } else {
            res.json({
                message: "class created",
                sucesss: true
            })
        }
    })
})

app.delete('/user/:id', Util.getUser, (req, res) => {
    try {
        res.user.remove()
        res.json({ message: 'deleted this user' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.delete('/class/:id', Util.getClass, (req, res) => {
    try {
        res.oneClass.remove()
        res.json({ message: 'deleted this class' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.put('/user/:id', Util.getUser, async (req, res) => {
    if (!req.params.id) {
        res.json({
            message: 'empty Id',
            success: false
        })
        return;
    }
    for (const property in req.body) {
        if (req.body[property] != null) {
            res.user[property] = req.body[property]
        } else {
            res.status(400).json({ message: err.message })
            return;
        }
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch {
        res.status(400).json({ message: err.message })
    }
})

app.put('/class/:id', Util.getClass, async (req, res) => {
    if (!req.params.id) {
        res.json({
            message: 'empty Id',
            success: false
        })
        return;
    }
    for (const property in req.body) {
        if (req.body[property] != null) {
            res.oneClass[property] = req.body[property]
        } else {
            res.status(400).json({ message: err.message })
            return;
        }
    }
    try {
        const updatedClass = await res.oneClass.save()
        res.json(updatedClass)
    } catch {
        res.status(400).json({ message: err.message })
    }
})

module.exports = app 