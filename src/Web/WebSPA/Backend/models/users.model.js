const ObjectID = require('mongodb').ObjectID;
const passwordHash = require('password-hash');
var api_key = 'be50061fbfda901da4a65c708161f130-f7910792-b56630ae';
var domain = 'sandboxcf31503b6d51400697199e7ff1b6ba82.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var cryptLib = require('cryptlib');

const connection = require('./connection');

const insert = (name, email, password) => {
    return new Promise((resolve, reject) => {
        connection(db => {
            db.collection('users').insert({
                name: name,
                email: email,
                password: passwordHash.generate(password),
                verify: false
            }, (err, data) => {
                db.close();
                if (err) {                    
                    resolve(false);
                } else {
                    resolve(data.ops[0]);
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
                    resolve(data.ops[0]);
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

const verifyEmail = (userId) => {
    return new Promise((resolve, reject) => {
        connection(db => {
            db.collection('users').findOneAndUpdate({
				_id: new ObjectID(userId)
			}, {
                '$set': {
                    verify: true
                }
            }, (err, data) => {
                db.close();
                resolve(err ? false : data);
            })
        })
    })
}

const sendEmail = function (user) {    
    let userId = user._id.toString();
    let token = getTokenLogin(userId);    
 	var data = {
        from: 'Administrator <me@samples.mailgun.org>',
        to: 'phatminhthegioi@gmail.com',
        subject: 'Verify account',
        text: `Hi, ${user.name}. Please confirm your email address by clicking on the link below.
        http://localhost:3007/users/verifyEmail/${token}`
    };

    return new Promise(function (resolve, reject) {
    	mailgun.messages().send(data, function (error, body) {
	        resolve(error ? false : true);
	    });
    })
}

const getTokenLogin = (val) => {
    if (val) {
        let key = cryptLib.getHashSha256('token', 32);
        return cryptLib.encrypt(val, key);
    }   
    
    return '';
}

module.exports = {
    insert,
    login,
    insertGmail,
    loginGmail,
    find,
    sendEmail,
    verifyEmail
}