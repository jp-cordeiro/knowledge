const config = require('../knexfile.js')
const knex = require('knex')(config)

//Run automatic migrate
//knex.migrate.latest([config])

module.exports = knex;