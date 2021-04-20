const express = require('express');
const router = express.Router();

const getDatabase = require('../database.js');
const db = getDatabase()


router.get('/:id', async (req, res) => {
    const id = req.params.id
    const collRef = db.collection('matches')
    const snapshot = await collRef.get()

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

    let winningGames = items.filter(match => {
        return match.winner === id
    })

    res.send(winningGames)
})

module.exports = router
