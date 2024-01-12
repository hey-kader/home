//console.warn('idb')
const idb = new Object()

idb.create = function () {
	let request = indexedDB.open('articles')
	request.onsuccess = function (event) {
		let db = event.target.result
		console.log(db.version)
		if (db.version === 1) {
			db.close()
			console.warn(db)
			let r = indexedDB.open('articles')
			r.onsuccess = function (event) {
				console.log('v2 success!', event.target.result)
				let tx = db.transaction(['syndications'], 'readonly', {keyPath: 'id'})
				let store = db.createObjectStore('syndications')

			}
			r.onupgradeneeded = function (event) {
				console.info('you gotta upgrade in v2')
				db = event.target.result
				if (store) {
					console.info('store', store)
				}
				else {
					console.info ('created OBJSTORE', store)
				}
			}
			r.onerror = function (error) {
				console.error('v2 error', error)
			}
		}
	}
	request.onerror = function (error) {
		console.error('could not do shit', error)
	}
	request.onupgradeneeded = function (event) {
		let db = event.target.result
		console.log(db)
		let tx = db.createObjectStore('syndications')
		tx.onsuccess = function (event) {
			console.log('tx SUCCESS',event)
		}
		tx.onerror = function (error) {
			console.error('E4',error)
		}
	}

}

idb.clearAll = function () {
	let req = indexedDB.deleteDatabase('articles')
	req.onsuccess = function (event) {
		//console.log(event.result)
	}
	req.onerror = function (error) {
		console.log('ERROR', error)
	}
}

idb.insertOne = function (one) {
	let request = indexedDB.open('articles')
	request.onsuccess = function (event) {
		let db = event.target.result
		let store = db.objectStore(['syndications'], 'readwrite', {durability: 'relaxed'})
		let req = store.put(one)
		req.onsuccess = function (event) {
			console.warn (event)
		}
		req.onerror = function (error) {
			console.error('EE', error)
		}
	}
}

idb.insert = function (ar) {
	let request = indexedDB.open('articles')
	request.onerror = function (error) {
		console.error('errr', error)
	}
	request.onsuccess = function (event) {
		let db = event.target.result
		let tx = db.transaction(['syndications'], 'readwrite')
		let store = tx.objectStore(['syndications'], 'readwrite', {durability: 'relaxed'})
		for (let i = 0; i < ar.length; i++) {
			let req = store.put(ar[i])
		}
		console.log(req)
		db.close()
		console.log('insertion complete db close complete')
	}
}

idb.get = function () {
	let request = indexedDB.open('articles')
	request.onerror = function (error) {
		console.error ('could not open db for get','error code is', error)
	}
	request.onsuccess = function (event) {
		let db = event.target.result
		let store = db.objectStore(['syndications'], 'readonly', {durability: 'relaxed'})
		let all = store.getAll()
		all	
		.then((res) => {
			console.log(res)	
			return res.result
		})
	}
}

self.export = idb
