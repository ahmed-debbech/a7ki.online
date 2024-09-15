const { MongoClient } = require('mongodb');

// Connection URL
const url = process.env.MONGOSTR;
console.log(process.env.MONGOSTR)
const client = new MongoClient(url);
var database;

// Database Name
const dbName = 'official';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to Mongo DB server');
  const db = client.db(dbName);
  database = db

  return 'done.';
}

function connect(){
    main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
}
module.exports = {
    connect,
    database
}