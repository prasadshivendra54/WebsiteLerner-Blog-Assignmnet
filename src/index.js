const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/route')

const app = express()

app.use(express.json())

// connect to databse
mongoose.connect("mongodb://127.0.0.1:27017/websitelerner", {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected')
}).catch((error) => {
    console.log(error.message)
})

app.use('/', router)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
})