'use strict';
var User = require('../models/user');
var jwt    = require('jsonwebtoken');
var config = require('../config');
var CryptoJS = require('crypto-js');


module.exports.getAllUsers = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) {
            return next(err);
        }
        return res.json(users);
    });
};

module.exports.createNewUser = function (req, res, next) {
    var user = new User({
        name: req.body.name,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, config.secretKey)
    });
    return user.save(function (err, newUser) {
        if (err) {
            return next(err);
        }
        console.log(newUser);
        return res.status(201).json(newUser);

    });
};

module.exports.loginUser = function (req, res, next) {
    User.findOne({username: req.body.username}, function (err, user) {

        if (err) {
            return next(err);
        }

        else if(user){
            const bytes  = CryptoJS.AES.decrypt(user.password.toString(), config.secretKey);
            const plainPassword = bytes.toString(CryptoJS.enc.Utf8);
            if (plainPassword === req.body.password.toString()) {
                var token = jwt.sign(user, config.secret, {
                    expiresIn : 60*60*24 // expires in 24 hours
                });
                res.json({
                    message: 'OK!',
                    token: token,
                    user: user
                });
            }
        }
    });
};

module.exports.getUserById = function (req, res, next) {
    User.findOne({_id: req.params.id}, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            var error = new Error();
            error.message = 'Not Found';
            error.status = 404;
            return next(error);
        }
        return res.json(user);
    });
};


module.exports.updateUserById = function (req, res, next) {
    
    User.update({_id: req.params.id}, {
        $set: {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
    }, function (err, modification) {
        console.log('modificationmodification', modification);
        if (err) {
            return next(err);
        }
        return res.json({user: modification});
    });
};

module.exports.deleteUserById = function (req, res, next) {
    console.log('Server delete');
    User.remove({_id: req.params.id},
        function (err, modification) {
            if (err) {
                return next(err);
            }
            return res.json({
                username: modification,
                status: 'OK'
            });
        });
}; 