const mysql = require("mysql");
require('dotenv').config();



// exports.launchDB = () => {
//     console.log('running');

//     // set up data base
//     mysql.createConnection({
//         host: process.env.dbhost,
//         user: process.env.dbuser,
//         password: process.env.mysqlPassword,
//         database: process.env.dbname
//     });

//     // launch data base
//     mysql.connect((err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(" ---> MYSQL conntected! <--- ");
//         }
//     });

// };

