var config = require('config');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

module.exports = (callback) => {
	return new Promise((resolve, reject) => {
		MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/shop-online", (err, db) => {
	        callback(db);
	    })
	})
}