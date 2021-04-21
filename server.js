const express = require('express');
const app = express();

const cors = require('cors');
const path = require('path');

const PORT = 1111

const staticFolder = path.join(__dirname, 'static')

const hamsters = require('./routes/hamsters.js');
const matches = require('./routes/matches.js');
const matchwinner = require('./routes/matchwinner.js');
const winners = require('./routes/winners.js');
const losers = require('./routes/losers.js');
const defeated = require('./routes/defeated.js');
const score = require('./routes/score.js');
const fewMatches = require('./routes/fewMatches.js');
const manyMatches = require('./routes/manyMatches.js');


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
app.use('/matchwinner', matchwinner);
app.use('/winners', winners);
app.use('/losers', losers);
app.use('/defeated', defeated);
app.use('/score', score);
app.use('/fewMatches', fewMatches);
app.use('/manyMatches', manyMatches);

app.listen(PORT, (req,res) => {
    console.log(`Server started at PORT: ${PORT}`);
})
