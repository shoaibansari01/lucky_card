const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
    Ticket: {
        card1: [Number],
        card2: [Number],
        card3: [Number]
    }
});

const gameSchema = new mongoose.Schema({
    AdminId: Number,
    GameId: Number,
    Bet: {
        Ticket1: betSchema,
        Ticket2: betSchema,
        Ticket3: betSchema
    }
});

const Game = mongoose.model('Game', gameSchema);
