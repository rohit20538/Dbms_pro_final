const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mysql = require("mysql2");

const loc1 = {
    R_id : 0,
    pick: "",
    drop: "",
    fare: 0,
    car_type: ""

}






// import alert from "alert";

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rohit0902',
    database: 'dbms',
    port: 3306
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});






const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.render("signup");
});
app.post("/", function(req,res){
    const name= req.body.urname;
    const mob = req.body.mob_no;
    const mail = req.body.mail;
    const pass = req.body.pass;
    const pass2 = req.body.pass2;
    if(pass === pass2){
        var sql = `INSERT INTO rider (R_id, Name, Email, Contact_no ,Password, location) VALUES (101, "${name}", "${mail}","${mob}","${pass}", "0000")`;
        connection.query(sql, function(err, result){
            if(err) throw err;
            console.log("record inserted");
            res.redirect("/");
            // CREATE USER user_account IDENTIFIED BY password;
        })
        
        
        
    }
    else{
        console.log("worng pass")
        res.redirect("/");
    }
})

app.get("/signin", function(req,res){
    
    res.render("signin");
})
app.post("/signin", function(req,res){
    const mob_no = req.body.numl;
    const pasl = req.body.pasl;
    const check = req.body.cab;
    // if(!check){
        // var sql = `INSERT INTO rider (R_id, Name, Email, Contact_no ,Password, location) VALUES (101, "${name}", "${mail}","${mob}","${pass}", "0000")`;
        var sql = "SELECT * FROM rider WHERE Contact_no=? AND Password=?";
        connection.query(sql, [mob_no, pasl], function(err, result){
            if(err) throw err;
            loc1.R_id=result[0]["R_id"];
            
            res.render("home" , {nam : result[0]['Name']});
            // res.redirect("/");
            // CREATE USER user_account IDENTIFIED BY password;
        })
    // }
    
})
app.get("/home", function(req,res){
    res.render("home");
})
app.post("/home", function(req,res){
    
    const pick = req.body.pick;
    const drop = req.body.drop;
    loc1.pick=pick;
    loc1.drop=drop;

    res.render("book_car");
    // yaha hume data insert krna hai trip table main

})
app.get("/book_car", function(req,res){
    
    res.render("book_car");
})
app.post("/book_car", function(req,res){
    console.log();
    if(req.body.btnrad1 === "on"){
        loc1.car_type="auto"
        loc1.fare=100;
    }
    else if(req.body.btnrad2==="on"){
        loc1.car_type="mini"
        loc1.fare=200
    }
    else if(req.body.btnrad3 === "on"){
        loc1.car_type="sedan"
        loc1.fare=300
    }
    // Trigger 1
    var sql = "SELECT  Name, Contact_no, Car_type. Num_plate FROM driver  INNER JOIN car ON driver.D_id = car.D_id AND car.Car_type = ? AND onride = 0";
        connection.query(sql, loc1.car_type, function(err, result){
        if(err) throw err;
        res.render("ridebook", {dname: result[0]["Name"], dnum: result[0]["Contact_no"],  ctype: result[0]["Car_type"], pnum: result[0]["Num_plate"]});
        })
        var sql = "INSERT INTO rid_req (req_id, car_type, R_id, Date , pick_loc, drop_loc) VALUES (301, ?, ?, ?, ?, ?)"
        connection.query(sql, [loc1.car_type, loc1.R_id, loc1.pick, loc1.drop]);
})

app.get("/ridecomplete", function(req, res){
    res.render("ridecomplete", {fare : loc1.fare});
})
app.get("/ridebook", function(req,res){
    res.render("ridebook")
})
app.get("/mytrips", function(req,res){
    res.render("mytrips");
})

app.get("")






app.listen(8000, function(){
    console.log("Server is running on port 8000");
});