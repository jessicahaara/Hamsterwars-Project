const express = require('express');
const router = express.Router();

const getDatabase = require('../database.js');
const db = getDatabase()

router.get('/', async (req, res) => {
    const collRef = db.collection('hamsters')
    const snapshot = await collRef.orderBy('wins', 'desc').limit(5).get()

    if(snapshot.empty) {
        res.send([])
        return
    }

    let items = []

    snapshot.forEach(doc => {
        const data = doc.data()
        data.id = doc.id
        items.push(data)
    });

    res.send(items)
})

module.exports = router
