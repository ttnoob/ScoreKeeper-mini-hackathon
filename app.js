const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/router')

const app = express();

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded());
// parse application/json
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ScoreKeeper', {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('connected');
})

// swagger
var swagger = require('./swagger');
swagger(app);

app.use('/', router);

app.use('/',express.static('public'))

app.listen(3000, function() {
    console.log('server listening on port 3000');
})