require('dotenv').config()
var express = require('express');
var app = express();
var router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM user');
    rs.send(result)
    //res.render('pages/db', result);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/api', require('./middlewares/auth.js'));
app.use('/api', require('./controllers/helloWorld.js')(router));
app.use('/', require('./controllers/user.js')(router));
app.listen(process.env.PORT);

module.exports = app