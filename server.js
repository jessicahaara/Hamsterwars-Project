const express = require('express');
const app = express();

const cors = require('cors');
const path = require('path');

const PORT = 1111

const staticFolder = path.join(__dirname, 'static')

const hamsters = require('./routes/hamsters.js');
const matches = require('./routes/matches.js');
const random = require('./routes/random.js');
const matchwinner = require('./routes/matchwinner.js');
const winners = require('./routes/winners.js');
const losers = require('./routes/losers.js');


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} `, req.params);
    next()
})

app.use( express.json() )
app.use( cors() )
app.use(express.static(staticFolder))


app.get('/', (req, res) => {
    res.send('Hello from server')
})

app.use('/hamsters', hamsters);
app.use('/matches', matches);
app.use('/random', random);
app.use('/matchwinner', matchwinner);
app.use('/winners', winners);
app.use('/losers', losers);


app.listen(PORT, (req,res) => {
    console.log(`Server started at PORT: ${PORT}`);
})
