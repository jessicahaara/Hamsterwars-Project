const admin = require('firebase-admin');

const serviceAccount = require('./firestore_private_key.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const getDatabase = () => {
    return admin.firestore()
}

const db = getDatabase()

const getCollection = async (coll) => {
    const collRef = db.collection(coll)
    const snapshot = await collRef.get()

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
}

const getDocById = async (coll, id) => {
    const docRef = await db.collection(coll).doc(id).get()
    if(!docRef.exists) {
        return 404
    }
    if(!id) {
        return 400
    }
    const data = docRef.data()
    return data
}

const postToCollection = async (coll, obj) => {
    if(obj.constructor === Object && Object.keys(obj).length === 0) {
        return 400
    }

    const docRef = await db.collection(coll).add(obj)
    return docRef.id
}

const putToCollection = async (coll, id, obj) => {
    const docRef = await db.collection(coll).doc(id).get()

    if(!docRef.exists) {
        return 404
    }

    if(!id || obj.constructor === Object && Object.keys(obj).length === 0) {
        return 400
    }

    await db.collection(coll).doc(id).set(obj, {merge: true})
    return 200
}

const deleteFromCollection = async (coll, id) => {
    const docRef = await db.collection(coll).doc(id).get()

    if(!docRef.exists) {
        return 404
    }

    if(!id) {
        return 400
    }
    await db.collection(coll).doc(id).delete()
    return 200
}

const getFilteredCollection = async (coll, field, op, value) => {
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
}

const getOrderedCollection = async (coll, order, sorting, limit) => {
    const collRef = db.collection(coll)
    const snapshot = await collRef.orderBy(order, sorting).limit(limit).get()

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
