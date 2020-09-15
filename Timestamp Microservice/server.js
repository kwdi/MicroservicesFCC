// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", function (req, res) {
  let date_em = new Date();
  res.json({"unix": date_em.getTime(), "utc" : date_em.toUTCString() });
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  let date_send = req.params.date_string;
  console.log(date_send);
  if (date_send.length == 13){
    date_send = parseInt(date_send);
  }

  let date_s = new Date(date_send);
  console.log(date_s);
  if (isNaN(date_s) == true){
    res.json({"error" : "Invalid Date" });
  }
  else{
  res.json({"unix": date_s.getTime(), "utc" : date_s.toUTCString() });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});