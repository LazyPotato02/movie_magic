const mongoose = require('mongoose')
require('../models/Movie')
require('../models/Cast')
const connectionString = 'mongodb://10.70.71.110:27017/movie-magic'


async function configDatabase() {
    await mongoose.connect(connectionString)

    console.log('Database connected')
}

module.exports = {configDatabase};