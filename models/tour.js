const mongoose = require('mongoose');

const TourSchema = mongoose.Schema({
    eventId: {type: Number},
    venue: {type: String},
    city: String,
    state: String,
    startTime: String,
    eventStartDate: Date,
    eventEndDate: Date,
    registeredPlayers: [],
    // leaderboard: add later will probably be an array of objects
    teeTimes: [], // array of objects {time: , players: [player1, player2, player3]}
    purse: String, // $
    // firstPlace: String, // $
    status: {type: Boolean, default: true}, // active or cancelled
    notes: {type: String, default: 'none'},
    createdBy: String
})

module.exports = mongoose.model('Tour', TourSchema);