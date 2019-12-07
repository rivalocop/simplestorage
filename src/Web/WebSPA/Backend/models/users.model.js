const ObjectID = require('mongodb').ObjectID;
const passwordHash = require('password-hash');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

const connection = require('./connection');
// main.js
var nodemailer = require('nodemailer');

const option = {
    service: 'gmail',
    auth: {
        user: 'phatminhthegioi@gmail.com', // email hoặc username
        pass: 'dmrhbqddhuuvfdbq' // password
    }
};
var transporter = nodemailer.createTransport(option);

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

const checkUser = (userId) => {
    return new Promise((resolve, reject) => {
        connection(db => {
            db.collection('users').findOne({
				_id: new ObjectID(userId)
            }, (err, data) => {
                db.close();
                resolve(err ? false : data);
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
                resolve(err ? false : data);
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
    return new Promise(function (resolve, reject) {
    transporter.verify(function(error, success) {
        // Nếu có lỗi.
        if (error) {
            console.log(error);
            resolve(false)
        } else { //Nếu thành công.
            var mail = {
                from: 'phatminhthegioi@gmail.com', // Địa chỉ email của người gửi
                to: `${user.email}`,
                subject: 'Verify account',
                text: `Hi, ${user.name}. Please confirm your email address by clicking on the link below.
                http://localhost:3007/users/verifyEmail/${token}`
            };
            //Tiến hành gửi email
                transporter.sendMail(mail, function(error, info) {
                    resolve(error ? false : true);
                });
            }
        });
    })
}

const getTokenLogin = (val) => {
    if (val) {
        return cryptr.encrypt(val);
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
    verifyEmail,
    checkUser
}