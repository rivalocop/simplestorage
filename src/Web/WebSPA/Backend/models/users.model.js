const ObjectID = require('mongodb').ObjectID;
const passwordHash = require('password-hash');
const connection = require('./connection');

const insert = (name, email, password) => {
    return new Promise((resolve, reject) => {
        connection(db => {
            db.collection('users').insert({
                name: name,
                email: email,
                password: passwordHash.generate(password)
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
            }, (err, data) => {
                db.close();
                if (err) {                    
                    resolve(false);
                } else {
                    if (data) {
                        if (passwordHash.verify(password, data.password)) {
                            resolve(data);
                        } else {
                            resolve(false);
                        }
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

const find = (name, email) => {
    return new Promise((resolve, reject) => {
        connection(db => {
            db.collection('users').findOne({
                 $or: [
                        { name: name },
                        { email: email } 
                    ] 
                }, (err, data) => {
                db.close();
                if (err) {                    
                    resolve(false);
                } else {
                    if (data) {
                        resolve(true);
                    } else {                        
                        resolve(false);
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
    loginGmail,
    find
}