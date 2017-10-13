const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// structure of document for PUT request 
const RankedGifSchema = new Schema({
    id: String,
    url: String,
    score: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('RankedGif', RankedGifSchema);