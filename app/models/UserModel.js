'use strict'

var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('mongoose-bcrypt');
var timestamps = require('mongoose-timestamp');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },

    password: {
        type: String,
        bcrypt: true,
        required: true
    },

    token: {
        type: String
    },

    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(bcrypt);
userSchema.plugin(timestamps);

module.exports = mongoose.model('User', userSchema);