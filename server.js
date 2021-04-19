const express = require('express');
const app = express();

const cors = require('cors');
const path = require('path');

const hamsters = require('./routes/hamsters.js');

const PORT = 1111

app.use('/hamsters', hamsters);

app.get('/', (req, res) => {
    res.send('Hello from server')
})

app.listen(PORT, (req,res) => {
    console.log(`Server started at PORT: ${PORT}`);
})
