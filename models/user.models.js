const mongoose = require("mongoose");

const User = mongoose.model(
    "User", 
    new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: true
        },
        surname: {
            type: String,
            required: true,
        },
        firstname: {
            type: String,
            required: true,
            unique: true 
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        registeredAt: {
            type: Date,
            default: Date.now
        },
    })
);

module.exports = User;