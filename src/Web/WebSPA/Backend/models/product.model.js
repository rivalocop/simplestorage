const ObjectID = require('mongodb').ObjectID;

const connection = require('./connection');

const insert = (name) => {
    return new Promise((resolve, reject) => {
        connection(db => {
            db.collection('products').insert({
                name: name
            }, (err, data) => {
                db.close();
                if (err) {                    
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
        })
    })
}

module.exports = {
    insert
}