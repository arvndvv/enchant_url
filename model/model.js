const mongoose = require('mongoose');

const UrlDataSchema = new mongoose.Schema({
    url: {
        required: true,
        type: String
    },
    id: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('shortUrl', UrlDataSchema)