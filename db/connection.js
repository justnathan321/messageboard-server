const monk = require('monk');
//Database we are connecting to (called messageboard)
const connectionString = process.env.MONGODB_URI || 'localhost/messageboard';
//Db holds the connection to the database
const db = monk(connectionString)


//Making the db available in other files (for example in messagemodel.js)
module.exports = db;
