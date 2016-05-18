var express = require('express');
var config = require('./config');
var mongoose = require('mongoose');
var setupController = require('./controllers/setupController')
var apiController = require('./controllers/apiController')
var session = require('express-session')


var app = express();
var port = process.env.PORT || 4000;

app.use('./assert', express.static(__dirname + '/public'));

app.set('view engine',4000);
app.use(session({secret: 'tg45ert3w65qwyhxfW21',
                resave: false,
                saveUninitialized: true,
}));

mongoose.connect(config.getDbconnectionString());
setupController(app);
apiController(app);
app.use(session);
app.listen(port,function(){
    console.log("start at port"+port);
});
