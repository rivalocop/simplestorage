const config = require('config');

const UserModel = require('./../models/users.model');

const register = (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    if (name && email && password) {
        UserModel.insert(name, email, password).then(data => {
            res.json({
                status: config.get('SUCCESS_STATUS'),
                data: data
            })
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

module.exports = {
    register,
    login,
    loginGmail
}