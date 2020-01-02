const mongoose = require('mongoose');
const Property = mongoose.Schema({
    owner: String,
    location: String,
    area: String,
    price: String,
    type: String,
    contact: Number,
    description: String
});

module.exports = mongoose.model('properties', Property);
