const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    // res.send("<h1> HOME Page </h1>")
    res.render('index')
});

router.get("/login", (req, res) => {
    // res.send("<h1> HOME Page </h1>")
    res.render('login')
});

router.get("/register", (req, res) => {
    // res.send("<h1> HOME Page </h1>")
    res.render('register')
});

router.get("/about", (req, res) => {
    // res.send("<h1> HOME Page </h1>")
    res.render('about')
});

router.get("/profile", (req, res) => {
    // res.send("<h1> HOME Page </h1>")
    res.render('profile')
});

module.exports = router;