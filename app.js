const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require('path');
// const db = require("./databaseSetup");
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.dbhost,
    user: process.env.dbuser,
    password: process.env.mysqlPassword,
    database: process.env.dbname
});

// launch data base
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(" ---> MYSQL conntected! <--- ");
    }
});
const pubicDirectory = path.join(__dirname, './public');
app.use(express.static(pubicDirectory));


// parsing URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}))
// parseing JSON bodies (as sent by API clients)
app.use(express.json());

app.set('view engine', 'hbs');


// define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(3000, () => {
    console.log("start on http://localhost:3000 ")});