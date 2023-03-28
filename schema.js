const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    campus: String,
    password: String
});

const User = mongoose.model('User', userSchema);

exports.User = User;