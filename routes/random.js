const express = require('express');
const router = express.Router();

const getDatabase = require('../database.js');
const db = getDatabase()

router.get('/', async (req, res) => {
    const collRef = db.collection('hamsters')
        const snapshot = await collRef.get()

        if(snapshot.empty) {
            res.sendStatus(404)
            return
        }

        let items = []

        snapshot.forEach(doc => {
            const data = doc.data()
            data.id = doc.id
            items.push(data)
        });

        const random = Math.floor(Math.random() * items.length)
        res.send(items[random])
})


module.exports = router
