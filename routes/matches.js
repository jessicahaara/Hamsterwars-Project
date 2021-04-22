const express = require('express')
const router = express.Router()

const db = require('../database.js');


router.get('/', async (req, res) => {
    const items = await db.getCollection('matches')

    if(typeof response === 'number') {
        res.sendStatus(response)
        return
    }
    res.send(items)
})


router.get('/:id', async (req, res) => {
    const response = await db.getDocById('matches', req.params.id)

    if(typeof response === 'number') {
        res.sendStatus(response)
        return
    }
    res.send(response)
})

router.post('/', async (req, res) => {
    const obj = req.body
    if (!obj.winnerId || !obj.loserId) {
        res.sendStatus(400)
        return
    }
    const response = await db.postToCollection('matches', obj)

    if(typeof response === 'number') {
        res.sendStatus(response)
        return
    }

    res.send(response)
})

router.delete('/:id', async (req, res) => {
    const response = await db.deleteFromCollection('matches', req.params.id)

    res.sendStatus(response)
})

module.exports = router;
