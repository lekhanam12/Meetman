
/*
 * GET home page.
 */
var massive = require('massive');
const connectionParms = {
  host: '10.146.85.68',
  port: 5432,
  database: 'smtd18',
  user: 'dev18',
  password: 'smtp18'
};
var db;
massive(connectionParms).then(connectedDB => {
  console.log('Connected to db');
  db = connectedDB;
}).catch(error => {
  console.log('Error connecting to db');
  console.log(error);
});

exports.list = function(req, res){

var myID = req.query.id;

 teamQuery = 'Select * from Team;'; 

if (myID != null) {
  myQuery = 'SELECT participant.*, organization.organizationname, team.*, committee.* \
                FROM participant \
                  LEFT JOIN team ON team.teamid = participant.teamid \
                  LEFT JOIN organization on organization.organizationid = participant.organizationid \
                  LEFT JOIN committee on committee.committeeid = participant.committeeid \
                  where participant.participantid = ' + myID;
                  
  myRender = 'participantDetails';

  } else {

  myQuery =  'SELECT participant.*, organization.organizationname, team.*, committee.* \
                FROM participant \
                  LEFT JOIN team ON team.teamid = participant.teamid \
                  LEFT JOIN committee on committee.committeeid = participant.committeeid \
                  LEFT JOIN organization on organization.organizationid = participant.organizationid order by 1;' 
                   
  myRender = 'participants';  
                           
}
    db.query(teamQuery).then(function(results1) {
        teamresults = results1;
      }).catch(error => {
        console.log('Error querying db',error);
        res.status(500);
     });

    db.query(myQuery).then(function(results2) {
        res.render(myRender, 
            { teams: teamresults, participants: results2})
      }).catch(error => {
        console.log('Error querying db',error);
        res.status(500);
     });  

           
};  

