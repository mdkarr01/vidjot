const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// Create Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// mongoose.model('ideas', IdeaSchema);
module.exports = mongoose.model("users", userSchema);