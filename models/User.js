const mongoose = require('mongoose');
const User = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date_added: Date
});

module.exports = mongoose.model('students', Student);
