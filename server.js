const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
app.set('view engine','hbs');
hbs.registerPartials(__dirname + "/views/partials");
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFileSync('server.log', log + "\n");
    next();
})
/* app.use((req, res, next)=>{
    res.render("maintainence.hbs")
}) */
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

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle : "Project Page"
    })
})

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage : "Something bad happened here"
    });
})

app.listen(port,()=>{
    console.log("connected to port :", port);
});