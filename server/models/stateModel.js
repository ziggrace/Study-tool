const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const url = 'mongodb://127.0.0.1:27017'

mongoose.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
    // Storing a reference to the database so you can use it later
    const db = client.db(dbName)
    console.log(`Connected MongoDB: ${url}`)
    console.log(`Database: ${dbName}`)
})

const StateSchema = new Schema({
    user: String,
    state: {
        subjects: Array,
        newSubj: String, 
        currentSubj: String,
        flashCards: {},
        newCard: Array
    }
})

module.exports = mongoose.model('StateDB', StateSchema)