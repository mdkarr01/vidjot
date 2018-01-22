const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const brcrypt = require("bcryptjs");

const router = express.Router();
var User = require("../models/User");


// User Login Route
router.get('/login', (req, res) => {
    res.render('users/login');
});

// User Register Route
router.get('/register', (req, res) => {
    res.render('users/register');
});

//Register POST Route
router.post("/register", (req, res) => {
    let errors = [];

    if (req.body.password != req.body.password2) {
        errors.push({
            text: "Passwords do not match. Please try again."
        });
    }

    if (req.body.password.length < 8) {
        errors.push({
            text: "Your password must be at least 8 characters long"
        });
    }

    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email
        });
    } else {
        res.send("passed");
    }
});

module.exports = router;