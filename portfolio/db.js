class db {
	constructor () {
		console.log('db constructor')
		self.db, self.request, self.store, self.tx;
	}
	init () {
		console.log('db init')
		self.request = indexedDB.open('main')	
		self.request.addEventListener('success', (event) => {
			console.log('successfully opened')
			self.db = event.target.result
		})
		self.request.addEventListener('error', (error) => {
			console.error('E1',error)
		})
		self.request.addEventListener('upgradeneeded', (event) => {
			console.log('upgradeneeded start')
			if (!event.target.result.objectStoreNames.contains('main')) {
				self.db = event.target.result
				self.db.createObjectStore('main')
				console.log('created object store main')
			}
		})
	}
	clear () {
		console.log('clearing')
		self.request = indexedDB.deleteDatabase('main')
		self.request.addEventListener('success', (event) => {
			console.info('cleared db main')
		})
		self.request.addEventListener('error', (error) => {
			console.error('E2', error)
		})
	}
}
