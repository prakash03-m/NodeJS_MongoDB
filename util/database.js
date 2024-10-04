const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db; 

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://prakash03m:NsqL2IG6nX5jBzW7@cluster0.jgbmd.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
    .then(client => {
      _db = client.db();
      callback();
    })
    .catch(err => {
    console.log(err);
    throw err;
  });
}

const getDb = () => {
  if(_db) {
    return _db;
  }
  throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;