const mongoose = require('mongoose');

const TourSchema = mongoose.Schema({
    eventId: {type: Number, required: true, unique: true},
    venue: {type: String, required: true},
    startTime: {type: String, required: true},

})