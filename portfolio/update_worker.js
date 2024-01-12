//console.log('init update worker')
importScripts('./idb.js')

		self.socket = new WebSocket('wss://localhost/update')
		self.socket.addEventListener('open', (event) => {
			console.log('connection opened for websocket')
			self.socket.send('start')
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
	console.log('e',event)
	if (event.data.data === 'createDB') {
		//console.log('create db...', idb)
		//onsole.info(event.data.dataset)
		//idb.create()
		//idb.insert(event.data.dataset)
		//idb.clearAll()
	}

})
