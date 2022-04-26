const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const sql=require('mysql2');

////

var con=sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aziz@mysql2020485',
    database:'uber',
    port:'3306'
})

const app = express();
app.set('view engine', 'ejs');


var parser=bodyParser.urlencoded({ extended: true})


//
//
// format for get sql data 

//
app.use(express.static("public"));
app.get("/", function(req,res){
    res.render("signup");
});
app.post('/',parser,function(req,res){
    var email = req.body.Email;
    var name = req.body.name;
    var pass = req.body.pass;
    var phone = req.body.Num;
    console.log(req.body)
    var sql = `INSERT INTO rider (Lr_ID, Email,Phone, Name,Password) VALUES (100, "${email}", "${phone}","${name}",${pass})`;
    con.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    res.render("home")
  });
})
//
app.get("/signin", function(req,res){

    res.render("signin");
})
app.post("/signin", function(req,res){
    console.log(req.body.numl)
    res.render("home")
})
app.get("/home/:u", function(req,res){
    const {u}=req.params;
    let sql=`SELECT * FROM rider WHERE R_ID = "${u}"`
    con.query(sql, function(err, result) {
        if (err) throw err;
        const ress=JSON.stringify(result);
        
        console.log( ress );
        console.log(result[0].Email);
        res.render('u',{ ...result[0] });
    });
})
app.get("/home", function(req,res){
    res.render("home"); 
})
app.post("/home", function(req,res){
    res.render("book_car")
    console.log(req.body.pick);
})
app.get("/book_car", function(req,res){
    res.render("book_car");
})
app.post("/book_car", function(req,res){
    res.render("ridebook");
})
app.get("/ridebook", function(req,res){
    res.render("ridebook")
})







app.listen(8000, function(){
    console.log("Server is running on port 8000");
});