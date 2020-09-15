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

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  console.log("add");

  let log = 
    {
    description: req.body.description,
    duration: parseInt(req.body.duration),
    date: req.body.date 
    }

  console.log(log);
  if (typeof log.date === "undefined" || log.date == ''){
  log.date = new Date().toString().substring(0,15)
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
          date: log.date  //toDateString(),
          
          
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



}

//{"_id":"5f601eba5ec17200307807ef","username":"zzzz","date":"Tue Sep 15 2020","duration":19,"description":"run"}
//{"_id":"5f60207eb74491129101e779","username":"zzzz","date":"Tue Sep 15 2020","duration":19,"description":"asd"}



//{"_id":"5f601eba5ec17200307807ef","username":"123","date":"Tue Sep 15 2020","duration":19,"description":"run"}
//{"_id":"5f6016614e8e970d07e20dd4","username":"123","date":"Tue Sep 15 2020","duration":123,"description":"123"}


// const expected = {
//   username: 'fcc_test_1596648410971', // Obviously the numbers change
//   description: 'test',
//   duration: 60,
//   _id: 5f29cd9e782d5f13d127b456, // Example id
//   date: 'Mon Jan 01 1990'
// }

          // _id: userReply._id,
          // username : userReply.username,
          // date: log.date,
          // duration: log.duration,
          // description: log.description