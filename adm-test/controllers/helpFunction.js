var UserLogin = require('../models/UserLogin');
module.exports = {
  greet:greet,
  validRegister:validRegister
}
var greeting = 'hello world';

function greet(data){
  console.log(data);
}

function validRegister(user,callback){
  var info= {status:200, errlog:null}
  if (!(user.username && user.sponsor && user.m_id &&
    user.password && user.permission)){
    info.status=401;
    info.errlog="not complete infor"
    callback(info)
  }
  else{
    // if user is already exist don't add user
    UserLogin.findOne({username: user.username},function(err,userinfo){
      if (userinfo!==null) {
        info.status=401;
        info.errlog="User already exist";
      }
      else{
        user.save(function(err) {
            if (err) throw err;
        });
      }
      callback(info)
    })
  }
}
