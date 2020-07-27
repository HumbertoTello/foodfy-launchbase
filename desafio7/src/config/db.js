const { Pool } = require("pg")

module.exports = new Pool ({
  users: "humberto",
  password: "humberto",
  host: "localhost",
  port: 5432,
  database: "foodfy"
})