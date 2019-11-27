const ObjectID = require('mongodb').ObjectID;

const connection = require('./connection');

const insert = (name, email, password) => {
    return new Promise((resolve, reject) => {
        connection(db => {
            db.collection('users').insert({
                name: name,
                email: email,
                password: password
            }, (err, data) => {
                db.close();
                if (err) {                    
                    resolve(false);
                } else {
                    resolve(data);
                }
            })
        })
    })
}

const insertGmail = (email) => {
    return new Promise((resolve, reject) => {
        connection(db => {
            db.collection('users').insert({
                email: email,
                isGmail: true
            }, (err, data) => {
                db.close();
                if (err) {                    
                    resolve(false);
                } else {
                    resolve(data);
                }
            })
        })
    })
}

const login = (name, password) => {
    return new Promise((resolve, reject) => {
        connection(db => {
            db.collection('users').findOne({
                name: name,
                password: password
            }, (err, data) => {
                db.close();
                if (err) {                    
                    resolve(false);
                } else {
                    if (data) {
                        resolve(data);
                    } else {
                        resolve(false);
                    }
                }
            })
        })
    })
}

const loginGmail = (email) => {
    return new Promise((resolve, reject) => {
        connection(db => {
            db.collection('users').findOne({
                email: email,
                isGmail: true
            }, (err, data) => {
                db.close();
                if (err) {                    
                    resolve(false);
                } else {
                    if (data) {
                        resolve(data);
                    } else {
                        resolve(null);
                    }
                }
            })
        })
    })
}

module.exports = {
    insert,
    login,
    insertGmail,
    loginGmail
}