'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var User = require('./user');

var urlSchema = new Schema({
    link: {type: String, required: true, unique: true},
    shortLink: {type: String},
    count: {type: Number, default: 0},
    authorId: {type: Schema.Types.ObjectId, ref: User}
});

module.exports = mongoose.model('Url', urlSchema);
