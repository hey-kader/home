console.log('postgreSQL init.')
const db = require ('./postgres')

async function registration (body) {
	let qstr = `INSERT INTO account (owner, password)\
	VALUES(ROW('${body.name}', '${body.uuid}')::member, ROW('${body.hash}', '${body.salt}')::password);`
	let r = await db.query(qstr)
	console.log(r)
	return r
}

module.exports = {
	registration: registration
}
