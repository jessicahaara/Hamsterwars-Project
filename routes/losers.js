const express = require('express');
const router = express.Router();

const db = require('../database.js');

router.get('/', async (req, res) => {
    const response = await db.getOrderedCollection('hamsters', 'defeats', 'desc', 5)

    res.send(response)
})

module.exports = router
