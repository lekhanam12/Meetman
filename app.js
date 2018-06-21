var express = require('express'); 
var massive = require('massive');
var helloworld = require('./routes/helloworld');
// var venues = require('./routes/venues');
var meetings = require('./routes/meetings');
var participants = require('./routes/participants');
var participantDetails = require('./routes/participantDetails');
var http = require('http');
var path = require('path');
var app = express();

// all environments settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded());
app.locals.moment = require('moment');
app.locals.accounting = require('accounting');
app.locals.numeral = require('numeral');

// This statement allows Session Variables to be used in Jade
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Get and Post Route Statements

app.get('/helloworld', helloworld.hello);		  								//  Hello World Example
app.get('/participants', participants.list);      
app.get('/meetings', meetings.list); 								//  Participants Listing              	  								
app.post('/participantDetails', participantDetails.postteam);                	//  Update Participant's Team

// Default Route
//app.get('/*', participants.list);	

// Start the Node Server on Port 3000
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
