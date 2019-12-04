var config = require('config');
var MongoClient = require('mongodb').MongoClient
	, assert = require('assert');

module.exports = (callback) => {
	return new Promise((resolve, reject) => {
		MongoClient.connect(process.env.MONGODB_URI || "mongodb://34.87.40.181:27017/backend-storage", (err, db) => {
			callback(db);
		})
	})
}