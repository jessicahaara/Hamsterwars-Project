const express = require('express');
const router = express.Router();

const db = require('../database.js');

router.get('/:id', async (req, res) => {
    const response = await db.getFilteredCollection('matches', 'winnerId', '==', req.params.id)

    if(typeof response === 'number') {
        res.sendStatus(response)
        return
    }

    let hamstersId = []
    response.forEach(hamster => {
        hamstersId.push(hamster.id)
    });

    res.send(hamstersId)
})
module.exports = router
