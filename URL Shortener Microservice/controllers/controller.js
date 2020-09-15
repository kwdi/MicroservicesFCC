const urlsModel = require("../models/model");
var crypto = require('crypto');



exports.create = (req, res) => {
  
  var ogUrl = req.body.url;

  if (ogUrl.startsWith("http://") || ogUrl.startsWith("https://") ) { 

  var ogUrl = req.body.url;
  var sha = crypto.createHash('sha256').update(req.body.url).digest('hex');
  var fiveSha = sha.substring(0,5);

  
  const urls = new urlsModel({
    url: ogUrl,
    hash : fiveSha
   
  });

  urls
    .save()
    .then((data) => {
      res.json({original_url: req.body.url, short_url: fiveSha});
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the url.",
      });
    });
  
  }
  else{
    res.json({"error":"invalid URL"});
  }

console.log("post");



};

exports.findUrl = (req, res) => {
  
  const id = req.params.id;

  urlsModel.find({hash: { $eq: id}})
    .then(data => {
      if (!data){
        res.status(404).send({ message: "Not found Url with id " + id });
      }
      else{
       res.redirect(data[0].url);
      }
    
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .send({ message: "Error retrieving url with id=" + id });
    });

   console.log("get"); 
};