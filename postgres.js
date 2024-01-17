const {Pool} = require ('pg')

const pool = new Pool ({
	user: process.env.postgres_username,
	password: process.env.postgres_password,
	host: process.env.postgres_hostname,
	port: process.env.postgres_port,
	database: process.env.postgres_db_name
})

module.exports = {
	query: (text, params) => pool.query(text, params)
}
