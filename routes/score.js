const express = require('express');
const router = express.Router();

const db = require('../database.js');

router.get('/:challanger/:defender', async (req, res) => {
    const challanger = req.params.challanger
    const defender = req.params.defender

    const challangerWins = await db.getFilteredCollection('matches', 'winnerId', '==', challanger)
    const challangerLoses = await db.getFilteredCollection('matches', 'loserId', '==', challanger)

    let games = []
    challangerWins.forEach(game => {
        if(game.loserId === defender) {
        games.push(game)
        }
    });

    challangerLoses.forEach(game => {
        if(game.winnerId === defender) {
        games.push(game)
        }
    });
    let gameScore = {
        challangerWins: 0,
        defenderWins: 0
    }

    games.forEach(game => {
        if(game.winnerId === challanger) {
            gameScore.challangerWins++
        }
        if(game.winnerId === defender) {
            gameScore.defenderWins++
        }
    });

    res.send(gameScore)
})

module.exports = router
