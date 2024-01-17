//console.log('init update worker')
importScripts('./db.js')


self.socket = new WebSocket(self.location.href)
self.socket.addEventListener('open', (event) => {
	console.log('connection opened for websocket')
	self.socket.id = self.crypto.randomUUID()
	console.log(self.socket.id)
	self.socket.send(self.socket.id)
})
self.socket.addEventListener('message', (event) => {
	console.log('web socket message received!', event.data)
	self.postMessage({ws: event.data})
})
self.socket.addEventListener('close', (event) => {
	console.log('websocket connection closed!', event)
})
self.socket.addEventListener('error', (error) => {
	console.error('SOCKET ERROR', error)
})


self.addEventListener('message', (event) => {
	if (event.data.data === 'createDB') {
		self.db = new db()
		self.db.init()
		console.log(db)
		//self.db.clear()
	}
})
