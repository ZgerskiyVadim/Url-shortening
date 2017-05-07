'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    username: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});


module.exports = mongoose.model('User', userSchema);


