const mongoose = require('mongoose')

const {connectionURI} = require('../config.json')

const setupDB = async () => {
    try {
        await mongoose.connect(connectionURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('connected to db')
    } catch(err) {
        console.log(err)
    }
}

// const connection = setupDB()

module.exports = setupDB