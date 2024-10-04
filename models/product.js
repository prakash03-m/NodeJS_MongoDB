const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Product {
  constructor(title, price, description, imageUrl ,id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if(this._id) {
      dbOp = db
      .collection('products')
      .updateOne({_id: this._id}, {$set: this});
    } else {
      dbOp = db
      .collection('products')
      .insertOne(this);
    }
    return dbOp      
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find() //find() returns a cursor to all documents in the collection and it returns a cursor, not the actual data. The cursor is a pointer to the result set in the database
      .toArray() //toArray() asynchronously retrieves all documents and converts them into a JavaScript array
      .then(products => {
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .find({
        _id: new mongodb.ObjectId(prodId)
      })
      .next() // When you're expecting only one document (as in a findById operation), next() efficiently retrieves that single document from the cursor.
              // It converts the cursor returned by find() into the actual document object.
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => console.log(err));
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
    .then(result => {
      console.log('Deleted')
    })
    .catch(err => {
      console.log(err)
    })
  }
}

module.exports = Product;
