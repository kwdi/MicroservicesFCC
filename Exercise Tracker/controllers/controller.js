//const User = require("../models/model");
const mongoose = require("../db");


let userSchema = new mongoose.Schema(
  {
  username: { type: String, required: true, unique: true, },
  log: 
  [{
  description: { type: String},
  duration: {type: Number},
  date: {type: String}
  }]
   
});



let User = mongoose.model('User', userSchema);

exports.create = (req, res) => {
  console.log("create");
  
  let userIN = req.body.username


  const newUser = new User({ username: userIN, log: []});
    
  User.findOne({username: userIN }, (err, userReply) =>{
  if(err){
      console.log("finduser_error")
    }
    if(userReply){
      //res.send('Username already taken')
    }
  });
        
  newUser.save((err, savedReply) => {
   
    if(err){
      console.log(err);
      //res.send('save_error');
    }
    else{
      res.json({ username : savedReply.username , _id :savedReply._id});
    }
    })
};




exports.allusers  = (req, res) => {

  console.log("print all");

  User.find({}, (err, usersReply)=> {
    if(err){
      console.log(err);
      //res.send('find_error');
    }
    else{
      res.send(usersReply)
    }
  })
  
   
};



exports.addExersise = (req, res) => {

  
  console.log("add");
  
  let log = 
    {
    description: req.body.description,
    duration: parseInt(req.body.duration),
    date: req.body.date 
    //
    }

  console.log(log);
  if (typeof log.date === "undefined" || log.date == ''){
  log.date = new Date().toString().substring(0,15)
  }
  else{
   log.date =new Date(req.body.date).toString().substring(0,15) 
  }
  console.log(log);

  User.findOneAndUpdate({_id : req.body.userId},{$push:{log}},{new: true},(err, userReply) => {
      if (err) {
        console.log(err);
      }
      if (userReply) {
        console.log(userReply);
        let reply =
        {
          
          
          username : userReply.username,
          description: log.description,
          duration: log.duration,
          _id: userReply._id, //req.body.userId,
          date: log.date//.toString().substring(0,15)  //toDateString(),
          
          
        }
        res.json(reply);
        console.log(reply);
      
      } 
      else 
      {
       //res.send('Unknown userId');
      }
    });



};



exports.getlog = (req, res) => {

  console.log('/////////////////Get log///////////////////');
  console.log(req.query);

  let limit = req.query.limit;
  let from = req.query.from;
  let to = req.query.to;

  User.findOne({_id: req.query.userId}, (err, userReply) => {
    if(err){
      console.log("finduser_error")
    }
    if(userReply) {
      //res.json(userReply);
      console.log(userReply);

    let count = userReply.log.length;

    let replytosend = {
                _id: userReply._id,
                username: userReply.username,
                count: count,
                log : userReply.log
                }

    
    if(from){
      let dateFrom =new Date(from).getTime()//.toString().substring(0,15);
      replytosend.log = replytosend.log.filter(dates => 
      {let compDate  = new Date(dates.date).getTime()
        return compDate >= dateFrom
      })
      console.log("from reply")
      console.log(replytosend.log);
    }
    
    if(to){
      let dateTo =new Date(to).getTime() //toString().substring(0,15);
      replytosend.log = replytosend.log.filter(dates => 
      {let compDate  = new Date(dates.date).getTime()
        return compDate <= dateTo
      })
      console.log("fo reply")
      console.log(replytosend.log);
    }
   
    

    
    
    if(limit){
      replytosend.log = replytosend.log.slice(0, limit);
      }




    res.json(replytosend);
    console.log(replytosend);
    }
  })
  
  


}

