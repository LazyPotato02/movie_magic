const {urlencoded,static: staticHandler} = require('express');
const cookieParser = require('cookie-parser')

const secret = 'secret'

function configExpress(app){
    app.use(cookieParser(secret))
    app.use(urlencoded({extended: true}));
    app.use('/static/', staticHandler('static'))
}

module.exports = {
    configExpress,
}