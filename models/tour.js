const mongoose = require('mongoose');

const TourSchema = mongoose.Schema({
    eventId: {type: Number, required: true},
    venue: {type: String, required: true},
    startTime: {type: Date},
    eventDates: [],
    registeredPlayers: [],
    // leaderboard: add later will probably be an array of objects
    teeTimes: [], // array of objects {time: , players: [player1, player2, player3]}
    totalPurse: String, // $
    firstPlace: String, // $
    status: String // active or cancelled
})

module.exports = mongoose.model('Tour', TourSchema);