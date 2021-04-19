const admin = require('firebase-admin');

const serviceAccount = require('./firestore_private_key.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const getDatabase = () => {
    return admin.firestore()
}

module.exports = getDatabase
