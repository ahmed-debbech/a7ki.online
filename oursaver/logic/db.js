const { MongoClient } = require('mongodb');

// Connection URL
const url = process.env.MONGOSTR;
const client = new MongoClient(url);
var dbObj = "";

// Database Name
const dbName = 'official';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to Mongo DB server');
  var db = client.db(dbName);
  dbObj = db
}

function success(){
  console.log("MONGO connection established")
}

function failed(err){
  console.log("MONGO failed to connect")
  console.log(err)
  client.close()
}

async function connect(){
  await main()
}

function database(){
  return dbObj
}

module.exports = {
    connect,
    database,
    failed,
    success
}