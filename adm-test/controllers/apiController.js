var UserLogin = require('../models/UserLogin');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session')
var helpfunction = require('./helpFunction')
module.exports = function(app) {
    var validRegister = helpfunction.validRegister
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}));

    //only admin can see this page
    app.get('/admin', function(req, res) {
        if (req.session.user === 'admin')
            return res.send("you are admin: "+req.session.username);
        res.status(404).send('Sorry, You need login as admin!');
    });

    //only admin can see this page
    app.get('/public', function(req, res) {
        if (req.session.user === 'admin' || 'public')
            return res.send("You are login as admin or public "+ req.session.username);
        res.status(404).send('Sorry, You need login!');
    });

    app.get('/', function(req, res) {
        helpfunction.greet("111")
        return res.send("hi")
    });
    //return a object if obj.status = 0 username or password not find
    //return 1 if find a match


    app.post('/login', function(req, res) {
        var result = {status: 0};
        var user = req.body.username;
        //find the exist username
        UserLogin.findOne({username: user}, function(err, UserInfo) {
            if (err) throw err;
            if (UserInfo === null)
                return res.send(JSON.stringify(result));
            UserInfo.comparePassword(req.body.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch === true)
                    result.status = 1
                    req.session.username = user
                    //maxAge use to control how long the user will be force logout
                    //req.session.cookie.maxAge = 60000;
                    req.session.user = UserInfo.permission
                    console.log(UserInfo)
                    return res.send(JSON.stringify(result)); // -&gt; Password123: true
                return res.send(JSON.stringify(result));
            });
        })
    })

    //finishi this function for register a new user
    app.post('/register', function(req, res) {
        var newUser = new UserLogin();
        newUser.username = req.body.username;
        newUser.sponsor = req.body.sponsor;
        newUser.m_id = req.body.m_id;
        newUser.password = req.body.password;
        newUser.permission = req.body.permission;
        // Store hash in your password DB.
        helpfunction.validRegister(newUser,function(info){
          if (info.status !== 200){
            return res.status(info.status).send(info.errlog);
          }
          return res.sendStatus(info.status);
        })
        // return res.status(400).send(helpfunction.validRegister(newUser).errlog);
    });

    //test only, delete everything in the database
    app.delete('/api/delete', function(freq, res) {
        UserLogin.remove({}, function(err) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            return res.send("Success Delete");
        });
    });


};
