require("dotenv").config()
const pgp = require('pg-promise')({});
const db = pgp(process.env.DATABASE_URL)
// const db = pgp("postgress://localhost:5432/beeper_db");
module.exports = db;