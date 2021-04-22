const express = require('express');
const router = express.Router();

const db = require('../database.js');

router.get('/', async (req, res) => {
    const response = await db.getOrderedCollection('hamsters', 'games', 'desc', 'all')


    const hamsters = []

    for (var i = 0; i < response.length; i++) {
        hamsters.push(response[i])
        if(response[i].games != response[i+1].games) {
            break
        }
    }

    res.send(hamsters)
})

module.exports = router
