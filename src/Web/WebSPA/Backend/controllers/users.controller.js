const config = require('config');
var cryptLib = require('cryptlib');

const UserModel = require('./../models/users.model');

const register = (req, res) => {    
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    if (name && email && password) {
        UserModel.find(name, email).then(data => {
            if (data) {
                res.json({
                    status: config.get('ERROR_STATUS'),
                    message: "Email or Username is exist"
                })
            } else {
                UserModel.insert(name, email, password).then(data => {
                    if (data) {                        
                        UserModel.sendEmail(data).then(verified => {
                            if (verified) {
                                res.json({
                                    status: config.get('SUCCESS_STATUS'),
                                    message: 'Please check email and verify your account'
                                })
                            } else {
                                res.json({
                                    status: config.get('ERROR_STATUS'),
                                    message: 'Cannot send email verified'
                                })
                            }
                        })
                    } else {
                        res.json({
                            status: config.get('ERROR_STATUS'),
                            message: 'Something went wrong'
                        })
                    }
                })
            }
        })
    } else {
        res.json({
            status: config.get('ERROR_STATUS'),
        })
    }
}

const login = (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    if (name && password) {
        UserModel.login(name, password).then(data => {
            if (data) {
                if (data.verify) {
                    res.json({
                        status: config.get('SUCCESS_STATUS'),
                        data: data
                    })
                } else {
                    res.json({
                        status: config.get('ERROR_STATUS'),
                        message: 'Please verify your account'
                    })
                }

            } else {
                res.json({
                    status: config.get('ERROR_STATUS'),
                    message: 'Please check your username or password'
                })
            }
            
        })
    } else {
        res.json({
            status: config.get('ERROR_STATUS'),
            message: 'Username and password are requirred'
        })
    }
}

const checkUser = (req, res) => {
    let userId = req.body.id;
    if (userId) {
        UserModel.checkUser(userId).then(data => {
            if (data) {
                res.json({
                    status: config.get('SUCCESS_STATUS'),
                    data: data
                })
            } else {
                res.json({
                    status: config.get('ERROR_STATUS'),
                    message: "Something went wrong"
                })
            }
        })
    } else {
        res.json({
            status: config.get('ERROR_STATUS'),
            message: "UserId is requirred"
        })
    }
}

const loginGmail = (req, res) => {
    let email = req.body.email;
    if (email) {
        UserModel.loginGmail(email).then(data => {
            if (data) {
                res.json({
                    status: config.get('SUCCESS_STATUS'),
                    data: data
                })
            } else {
                UserModel.insertGmail(email).then(user => {
                    if (user) {
                        res.json({
                            status: config.get('SUCCESS_STATUS'),
                            data: user
                        })
                    }
                })
            }
        })
    } else {
        res.json({
            status: config.get('ERROR_STATUS'),
        })
    }
}

const verifyEmail = (req, res) => {
    let token = req.params.token;
    let userId = decryptToken(token);
    if (userId) {
        UserModel.verifyEmail(userId).then(data => {
            if (data) {
                res.json({
                    status: config.get('SUCCESS_STATUS'),
                    data: data
                })
            } else {
                res.json({
                    status: config.get('ERROR_STATUS'),
                })
            }
        })
    } else {
        res.json({
            status: config.get('ERROR_STATUS'),
        })
    }
}

const decryptToken = (token) => {
	if (token) {
		try {
			let key = cryptLib.getHashSha256('token', 32);
			return cryptLib.decrypt(token, key);
		} catch (error) {
			return null;
		}
	}

	return null;
}

module.exports = {
    register,
    login,
    loginGmail,
    verifyEmail,
    checkUser
}