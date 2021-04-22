const express = require('express');
const router = express.Router();

const db = require('../database.js');
const collection = db.getCollection('hamsters')

router.get('/', async (req, res) => {
    const items = await collection
    res.send(items)
})

router.get('/random', async (req, res) => {
    const items = await collection
    const random = Math.floor(Math.random() * items.length)
    res.send(items[random])
})

router.get('/:id', async (req, res) => {
    const response = await db.getDocById('hamsters', req.params.id)

    if(typeof response === 'number') {
        res.sendStatus(response)
        return
    }
    res.send(response)
})

router.post('/', async (req, res) => {
    const response = await db.postToCollection('hamsters', req.body)

    if(typeof response === 'number') {
        res.sendStatus(response)
        return
    }
    res.send({id: response})
})

router.put('/:id', async (req, res) => {
    const response = await db.putToCollection('hamsters', req.params.id, req.body)

    res.sendStatus(response)
})

router.delete('/:id', async (req, res) => {
    const response = await db.deleteFromCollection('hamsters', req.params.id)

    res.sendStatus(response)
})

module.exports = router
