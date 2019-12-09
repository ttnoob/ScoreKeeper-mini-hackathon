const mongoose = require('mongoose');

let Schema = mongoose.Schema

let userSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: props => `Email invalid`
        },
        required: [true, 'Email address is required']
    }, 
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    dob: {
        type: String
    },
    phoneNum: {
        type: String
    },
    _class: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }]
})

module.exports = mongoose.model('User', userSchema);