const express = require('express')
const router = express.Router()

const getDatabase = require('../database.js');
const db = getDatabase()


router.get('/', async (req, res) => {
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

    res.send(items)
})


router.get('/:id', async (req, res) => {
    const id = req.params.id
    const docRef = await db.collection('matches').doc(id).get()

    if(!docRef.exists) {
        res.sendStatus(404)
        return
    }

    if(!id) {
        res.sendStatus(400)
        return
    }

    res.send(docRef.data())
})

router.post('/', async (req, res) => {
    const obj = req.body

    if(obj.constructor === Object && Object.keys(obj).length === 0) {
        res.sendStatus(400)
    }

    const docRef = await db.collection('matches').add(obj)
    res.send(docRef.id)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const docRef = await db.collection('matches').doc(id).get()

    if(!docRef.exists) {
        res.sendStatus(404)
        return
    }

    if(!id) {
        res.sendStatus(400)
        return
    }

    await db.collection('matches').doc(id).delete()
    res.sendStatus(200)
})

// router.get('/winners', (req, res) => {
//     res.send('test')
// })

module.exports = router;
