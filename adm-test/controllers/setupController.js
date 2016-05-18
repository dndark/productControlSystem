var UserLogin = require('../models/UserLogin');
var file = require('../user_login.json');
module.exports = function(app){
  app.get('/api/setupUser',function(req,res){

    var starterUser = file;
    UserLogin.create(starterUser, function(err,result){
      res.send(result);
    });
  });
}
