const express = require('express');
const router = express.Router();

const getDatabase = require('../database.js');
const db = getDatabase()

router.get('/', async (req, res) => {

    const collRef = db.collection('hamsters')
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

    res.send(items)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const docRef = await db.collection('hamsters').doc(id).get()

    if(!docRef.exists) {
        res.sendStatus(404)
        return
    }

    if(!id) {
        res.sendStatus(400)
        return
    }

    const data = docRef.data()
    res.send(data)

})

router.post('/', async (req, res) => {
    const obj = req.body

    if(obj.constructor === Object && Object.keys(obj).length === 0) {
        res.sendStatus(400)
        return
    }

    const docRef = await db.collection('hamsters').add(obj)
    res.send(docRef.id)
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const obj = req.body
    const docRef = await db.collection('hamsters').doc(id).get()

    if(!docRef.exists) {
        res.sendStatus(404)
        return
    }

    if(!id) {
        res.sendStatus(400)
        return
    }

    if(obj.constructor === Object && Object.keys(obj).length === 0) {
        res.sendStatus(400)
        return
    }

    await db.collection('hamsters').doc(id).set(obj, {merge: true})
    res.sendStatus(200)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const docRef = await db.collection('hamsters').doc(id).get()

    if(!docRef.exists) {
        res.sendStatus(404)
        return
    }

    if(!id) {
        res.sendStatus(400)
        return
    }

    await db.collection('hamsters').doc(id).delete()
    res.sendStatus(200)
})

router.get('/hej', (req, res) => {
    res.send('hej')
})

module.exports = router
