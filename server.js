const express = require('express');
const app = express();

const cors = require('cors');
const path = require('path');

const PORT = 1111

const hamsters = require('./routes/hamsters.js');


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} `, req.params);
    next()
})

app.use( express. json() )
app.use( cors() )


app.get('/', (req, res) => {
    res.send('Hello from server')
})

app.use('/hamsters', hamsters);


app.listen(PORT, (req,res) => {
    console.log(`Server started at PORT: ${PORT}`);
})
