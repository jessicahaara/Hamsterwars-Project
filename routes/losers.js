const express = require('express');
const router = express.Router();

const getDatabase = require('../database.js');
const db = getDatabase()

router.get('/', (req, res) => {
    res.send('loser')
})

module.exports = router
