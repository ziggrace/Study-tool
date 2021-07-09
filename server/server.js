const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
const bodyParser = require("body-parser")
// const router = express.Router();
const apiRouter = require('./routers/api');

/**
* Automatically parse urlencoded body content from incoming requests and place it
* in req.body
*/
// app.set('view engine', 'jsx');
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api', apiRouter)
//app.use('/', (req, res) => res.send("Hello world"))

// app.use('/', (err, req, res, next) => {
//     console.log(err);
//     res.status(404).send('lol you\'re fucking up dude');
// });

app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });

module.exports = app;
  