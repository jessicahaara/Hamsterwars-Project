const express = require('express');
const router = express.Router();

const db = require('../database.js');

router.get('/', async (req, res) => {
    const response = await db.getOrderedCollection('hamsters', 'games', 'desc', 10)

    const hamsters = []

    response.forEach(hamster => {
        hamsters.push(hamster.id)
    });

    res.send(hamsters)
})

module.exports = router
