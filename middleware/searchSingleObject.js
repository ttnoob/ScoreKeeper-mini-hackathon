const express = require('express')
const app = express.Router()
const User = require('../models/user')
const Class = require('../models/class')

async function getUser(req, res, next) {
    try {
        user = await User.findById(req.params.id).populate('_class')
        if (user == null) {
            return res.status(404).json({ message: 'Cant find user'})
        }
    } catch(err){
        return res.status(500).json({ message: err.message })
    }
  
    res.user = user
    next()
}

async function getClass(req, res, next) {
    try {
        oneClass = await Class.findById(req.params.id).populate('_class')
        if (oneClass == null) {
            return res.status(404).json({ message: 'Cant find class'})
        }
    } catch(err){
        return res.status(500).json({ message: err.message })
    }
  
    res.oneClass = oneClass
    next()
}

module.exports = SearchUtils;