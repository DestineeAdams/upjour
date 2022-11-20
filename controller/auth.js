const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


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


exports.login = (req, res) => {
    const {email, password} = req.body;


    db.query('select * from USERS WHERE email = ?;', [email, password], async(error, result) =>
    { 

        // console.log(result[0].password);

        if(error){
            console.log(error);
        } 

        else if (result.length < 0) {
            return res.render('register', {
                message: 'please fill out form'
            })

        } 

        // password check
        else if (bcrypt.compareSync(req.body.password, result[0].password)) {
            res.send("successful login");
        }

        else {
            return res.render('login', {
                message: 'incorrert password or email'
            })
        }


    });

    // res.send("testing login...");
};

exports.register = (req, res) => {
    console.log(req.body);
    
    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // const passwordConfirm = req.body.passwordConfirm;

    // same thing as above
    const {name, email, password, passwordConfirm} = req.body;
    
    // the question mark get filled with email
    db.query('SELECT email FROM USERS where email = ?;', [email], async(error, result) =>
    {   

        if(error){
            console.log(error);
        } 
        
        else if (result.length > 0) {
            return res.render('register', {
                message: 'that email is already in use'
            })

        } 
        
        else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'password do not match'
            })
        }

        // ENCRYPTING password
        // it might take longer to run so function async
        let hashedPassword = await bcrypt.hash(password, 8);

        console.log(hashedPassword);


        // res.send("testing...");

        // sending information to database
        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword}, (error, result) => {
            if (error) {
                console.log(error);

            } else {

                console.log(result);

                return res.render('register', {
                    message: 'you are now registered go to login'
                });
            }
        });


    });
    
    
 
}
