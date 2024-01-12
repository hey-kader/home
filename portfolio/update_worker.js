//console.log('init update worker')
importScripts('./idb.js')


self.addEventListener('message', (event) => {
	if (event.data.data === 'createDB') {
		//console.log('create db...', idb)
		//onsole.info(event.data.dataset)
		//idb.create()
		//idb.insert(event.data.dataset)
		idb.clearAll()
	}
})
