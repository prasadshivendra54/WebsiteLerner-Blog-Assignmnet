const { connect } = require('http2')
const mongoose = require('mongoose')


// config

const database = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true
    })
        .then(() => console.log("SHIVENDRA your mongoDB is connected now"))
    // .catch(err => console.log(err)) //  for this type error we have created sapret code to handel Unhandled Promiss Rejection 
}

module.exports = database