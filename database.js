const admin = require('firebase-admin');

let privateKey;
if( process.env.PRIVATE_KEY ) {
	privateKey = JSON.parse(process.env.PRIVATE_KEY)
} else {
	privateKey = require('./firestore_private_key.json')
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const getDatabase = () => {
    return admin.firestore()
}

const db = getDatabase()

const getCollection = async (coll) => {
    try {
        const collRef = db.collection(coll)
        const snapshot = await collRef.get()



        if(snapshot.empty) {
            return 404
        }
        let items = []

        snapshot.forEach(doc => {
            const data = doc.data()
            data.id = doc.id
            items.push(data)
        });

        return items
    } catch (error) {
        return 500
    }
}

const getDocById = async (coll, id) => {
    try{
        if(!id) {
            return 400
        }

        const docRef = await db.collection(coll).doc(id).get()
        if(!docRef.exists) {
            return 404
        }

        const data = docRef.data()
        return data
    } catch (error) {
        return 500
    }
}

const postToCollection = async (coll, obj) => {
    try {
        if(Object.keys(obj).length === 0) {
            return 400
        }

        const docRef = await db.collection(coll).add(obj)
        return docRef.id
    } catch (error) {
        return 500
    }
}

const putToCollection = async (coll, id, obj) => {
    try{
        if(Object.keys(obj).length === 0) {
            return 400
        }
        if(!id) {
            return 400
        }

        const docRef = await db.collection(coll).doc(id).get()
        if(!docRef.exists) {
            return 404
        }

        await db.collection(coll).doc(id).set(obj, {merge: true})
        return 200
    } catch (error) {
        return 500
    }
}

const deleteFromCollection = async (coll, id) => {
    try {
        if(!id) {
            return 400
        }

        const docRef = await db.collection(coll).doc(id).get()

        if(!docRef.exists) {
            return 404
        }

        await db.collection(coll).doc(id).delete()
        return 200
    } catch (error) {
        return 500
    }
}

const getFilteredCollection = async (coll, field, op, value) => {
    try {
        const collRef = db.collection(coll)
        const snapshot = await collRef.where(field, op, value).get()
        let items = []

        if(snapshot.empty) {
            return 404
        }

        snapshot.forEach(doc => {
            const data = doc.data()
            data.id = doc.id
            items.push(data)
        });

        return items
    } catch (error) {
        return 500
    }
}

const getOrderedCollection = async (coll, order, sorting, limit) => {
    try {
        const collRef = db.collection(coll)
        let snapshot = null
        if(limit === 'all') {
            snapshot = await collRef.orderBy(order, sorting).get()
        } else {
            snapshot = await collRef.orderBy(order, sorting).limit(limit).get()
        }

        let items = []

        if(snapshot.empty) {
            return items
        }

        snapshot.forEach(doc => {
            const data = doc.data()
            data.id = doc.id
            items.push(data)
        });

        return items
    } catch (error) {
        return 500
    }
}

module.exports = {
    getCollection,
    getDocById,
    postToCollection,
    putToCollection,
    deleteFromCollection,
    getFilteredCollection,
    getOrderedCollection
}
