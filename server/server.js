const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
const bodyParser = require("body-parser")
const router = express.Router();

toSubj = path.resolve(__dirname, "/src/Subject")
console.log(toSubj)
/**
* Automatically parse urlencoded body content from incoming requests and place it
* in req.body
*/
app.set('view engine', 'jsx');

app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res) {
    console.log("hello")
    res.redirect(__dirname + "/src/Subject.js");
    console.log("world")
});

//app.use('/', (req, res) => res.send("Hello world"))
app.use('/subject', router)

app.use((err, req, res, next) => {
    console.log(err);
    res.status(404).send('lol you\'re fucking up dude');
});

app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });

module.exports = app;
  