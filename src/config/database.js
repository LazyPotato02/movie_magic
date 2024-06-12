const mongoose = require('mongoose')
const {Movie} = require('../models/Movie')
const {Cast} = require('../models/Cast')
const {User} = require('../models/User')
const connectionString = 'mongodb://10.70.71.110:27017/movie-magic'


async function configDatabase() {
    await mongoose.connect(connectionString)
    // await migrateMovies();
    console.log('Database connected')
}

module.exports = {configDatabase};


// async function migrateMovies() {
//     const firstUser = await User.findOne()
//     console.log(firstUser._id)
//     await Movie.updateMany({}, {$set: {author: firstUser._id}})
//
// }