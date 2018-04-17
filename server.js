const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
app.set('view engine','hbs');
hbs.registerPartials(__dirname + "/views/partials");
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFileSync('server.log', log + "\n");
    next();
})
app.use((req, res, next)=>{
    res.render("maintainence.hbs")
})
app.use(express.static(__dirname + "/public"));
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle : "home Page",
        message : "Welcome to this great website"
    })
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle : "About Page"
    })
})

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage : "Something bad happened here"
    });
})

app.listen(3000);