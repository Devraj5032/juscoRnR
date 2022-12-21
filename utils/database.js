const mysql = require('mysql');

const connection = mysql.createConnection({
    host:"localhost",
    user:"gq_rewards",
    password:"Yes",
    database:"gq_rewards"

})

connection.connect((err)=> {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
      console.log('connected');
});

module.exports = connection;
