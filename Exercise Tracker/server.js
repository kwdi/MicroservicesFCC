'use strict';
//require('./models/model');

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var controller = require("./controllers/controller.js");
const cors = require('cors')
//var mongo = require('mongodb');
//const mongoose = require('mongoose')
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/exercise-track' )

// Basic Configuration 
var port = process.env.PORT || 3000;

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.post("/api/exercise/new-user", controller.create);
app.get("/api/exercise/users", controller.allusers);
app.post("/api/exercise/add", controller.addExersise);
app.get("/api/exercise/log", controller.getlog);

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})





app.listen(port, function() {
  console.log('Node.js listening ...');
});


//5f5f2a8ea98d810037b9af75