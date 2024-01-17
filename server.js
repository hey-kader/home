require ("dotenv").config()

const express = require ("express")
const https = require ("https")
const path = require ("path")
const fs = require ("fs")

const WebSocket = require ("ws")

const credentials = {
	cert: fs.readFileSync(process.env.ssl_cert),
	key: fs.readFileSync(process.env.ssl_cert_key)
}


const app = express ()
app.settings['x-powered-by'] = false

/* middlewares */
const bodyparser = require ("body-parser")
const favicon = require ("serve-favicon")

const session = require ("express-session")
const MongoStore = require ("connect-mongo")
/* middlewares */

app.use(express.static(path.join(__dirname, 'portfolio')))

app.use(bodyparser.json({urlencoded: true}))
app.use(favicon(path.join(__dirname, 'portfolio', 'favicon.ico')))

app.use(session({
	saveUninitialized: false,
	resave: false,
	secret: process.env.mongodb_secret,
	store: 
		MongoStore.create({
			mongoUrl: process.env.uri 
		})
}))

app.get ('/', (req, res) => {
	if (req.session.views) {
		++req.session.views
	}
	else {
		req.session.views = 1
	}
	res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/ok', (req, res) => {
	res.status(200).send('hi')
})

app.get('/content', (req, res) => {
	let f = fs.readdir(path.join(__dirname,'portfolio','articles'), (e, files) => {
		let fileset =  []
		for (let i = 0; i < files.length; i++) {
			let data = fs.readFileSync(path.join(__dirname, 'portfolio', 'articles', files[i]))
			let filepath = files[i] 
			fileset.push({path: filepath, content: data.toString()})
		}
		res.status(200).send(JSON.stringify(fileset))
	})
})

app.post('/contact', (req, res) => {
	console.log(req.session.views)
	console.log(req.body, req.ip)
	res.redirect('/')
})

let server = https.createServer(credentials, app)

const wss = new WebSocket.Server({server: server, path: '/update_worker.js'})
let online = new Array ()

wss.on ('connection', (ws) => {
	console.log('new client connection')
	ws.on ('message', (msg) => {
		console.log('message!', msg)
		if (msg.length === 36) {
			ws.id = msg
			online.push(msg)
			// listen to the articles folder, and emit a message when it is updated
		}
		ws.send(online)
	})
	ws.on('close', () => {
		console.log('connection closed!', online, i)
		for (var i = 0; i < online.length; i++) {
			if (online[i] === ws.id) {
				console.log(online.length)
				online.pop(i)
			}
		}
		ws.close()
	})
})

server.listen(process.env.port, process.env.addr, () => {
})
