
const mongoose = require('mongoose');
const User = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    CNIC: Number,
    username: String,
    password: String,
    contact: Number,
    type: String
});

module.exports = mongoose.model('users', User);
