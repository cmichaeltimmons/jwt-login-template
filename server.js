require('dotenv').config()
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/api', require('./middlewares/auth.js'));
app.use('/api', require('./controllers/helloWorld.js')(router));
app.use('/', require('./controllers/user.js')(router));
app.listen(process.env.PORT);

module.exports = app