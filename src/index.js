const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/route')

const dotenv = require('dotenv') //
const database = require('./config/database.js')

const functions = require("firebase-functions") // added during deploy on firebse

const app = express()

app.use(express.json())

// ------------------------ Dadabase -------------------------------------

// connect to databse in Local - 
// mongoose.connect("mongodb://127.0.0.1:27017/websitelerner", {
//     useNewUrlParser: true
// }).then(() => {
//     console.log('Database connected')
// }).catch((error) => {
//     console.log(error.message)
// })


// ------- OR ---------

// config - 
dotenv.config({ path: 'src/config/config.env' }) // set our config path

// conect to database - 
database()

// ------------------------------------------------------------- 


app.use('/', router)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
})


exports.api = functions.https.onRequest(app) // added during deploy on firebse