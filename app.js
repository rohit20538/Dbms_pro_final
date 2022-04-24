const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.render("signup");
});
app.post("/", function(req,res){
    console.log(req.body.pass);
})

app.get("/signin", function(req,res){
    res.render("signin");
})
app.post("/signin", function(req,res){
    console.log(req.body.numl)
    res.render("home")
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