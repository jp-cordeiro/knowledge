const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db

//Load modules of app
consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validator.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3500, () => {
    console.log('executando')
})