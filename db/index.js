const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
let database = null

module.exports = function(){
  if (database === null) {
    database = require('knex')(configuration)
  }

  return database
}