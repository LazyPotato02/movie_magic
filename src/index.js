const express = require('express');
const {configHbs} = require("./config/hbs");
const {configExpress} = require("./config/express");
const {router, configRoutes} = require("./config/routes");
const {configDatabase} = require("./config/database");

const PORT = 3000
async function start(){
    const app = express();

    await configDatabase()
    configHbs(app)
    configExpress(app)
    configRoutes(app)
    app.use(router)

    app.listen(3000, () => {
        console.log(`Application running on ${PORT}`)
    })
}

start()