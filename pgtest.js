require ('dotenv').config()
const db = require ('./postgres')

function createPostType () {
	return `CREATE TYPE post AS (\
	sender TEXT,\
	time TIMESTAMP\
);`
}

function createMemberType () {
	return `CREATE TYPE member AS (\
	name TEXT,\
	uuid TEXT\
);`
}
function createDirectMessageTextType () {
	return `CREATE TYPE directmessagetext AS (\
		recipient member,\
		sender member,\
		at TIMESTAMP,\
		message TEXT\
	);`
}

function createImageType () {
	return `CREATE TYPE image AS (\
		name TEXT,\
		mime TEXT,\
		size INT,\
		width INT,\
		height INT,\
		at TIMESTAMP,\
		data BYTEA\
	);`
}

function createPasswordType () {
	return `CREATE TYPE password AS (\
		hash TEXT,\
		salt TEXT\
	);`
}

function createVoteType () {
	return `CREATE TYPE vote as (\
		by member,\
		at TIMESTAMP,\
		flip boolean\
	);`
}

function createCommentType () {
	return `CREATE TYPE comment AS (\
		by member,\
		votes vote[],\
		at TIMESTAMP,\
		context UUID\
	);`
}

function createTableAccount () {
	return `CREATE TABLE account (\
		owner member,\
		password password\
	);`
}


function createType (query) {
	db.query(query)
		.then((result) => {
			console.log(result)
			return result
	})
}

function createTable (query) {
	db.query(query)
		.then((result) => {
			console.log(result)
			return result
	})
}

function insertAccountQuery (acct) {
	return `INSERT INTO account (owner, password)\
	VALUES(ROW('${acct.name}', '${acct.uuid}')::member, ROW('${acct.password.hash}', '${acct.password.salt}')::password);`
}

//let postType = createPostType()
//let userType = createMemberType()
//let directMessageTextType = createDirectMessageTextType()
//let imageType = createImageType()
//let passwordType = createPasswordType()
//let voteType = createVoteType()
//let commentType = createCommentType()
//let res = createType(commentType)

//let t = createTableAccount()
//let res = createTable(t)

let account = {
	name: 'kader',
	uuid: 'heheahddfadj',
	password: {
		hash: 'pwhashhere',
		salt: 'pwsalthere',
	}
}


let acct_query = insertAccountQuery(account)
db.query(acct_query)
	.then((response) => {
		console.log(response)
})
