/**
 * Created by Vadim on 08.01.2017.
 */
'use strict';
var Url = require('../models/url');
var randomString = require('randomstring');
var User = require('../models/user');

module.exports.getAllUrl = function (req, res, next) {
    Url.find({}, function (err, urls) {
        if (err) {
            return next(err);
        }
        User.populate(urls, {path: 'authorId'}, function (err, docs) {
            if (err) {
                return next(err);
            }
            return res.json(docs);

        });

        // User.find({}, function (err, users) {
        //     if (err) {
        //         return next(err);
        //     }
        //     var array = [];
        //     for (var url of urls){
        //         console.log('url', url.authorId);
        //         for(var user of users){
        //             console.log('user', user._id);
        //             if(url.authorId){
        //                 if(url.authorId.toString() === user._id.toString()){
        //                     var someObject = {};
        //                     someObject.username = user.username;
        //                     someObject.link = url.link;
        //                     someObject.shortLink = url.shortLink;
        //                     array.push(someObject);
        //
        //                 }
        //             }
        //
        //
        //
        //         }
        //     }
        //     res.json(array);
        // });


    });

};

module.exports.createUrl = function (req, res, next) {
    var url = new Url({
        link: req.body.link,
        shortLink: randomString.generate({
            length: 4,
            alphabetic: /[a-z A-Z]/,
            // alphabetic: /[a-zA-Z]+/g,
            charset: req.body.link
        }),
        authorId: req.decoded._doc._id
    });
    url.save(function (err, newUrl) {
        if (err) {
            return next(err);
        }
        return res.status(201).json(newUrl);
    });
};

module.exports.redirectURl = function (req, res, next) {
    Url.findOneAndUpdate({shortLink: req.params.shortLink}, {$inc: { count: 1}}, {new: true}, function (err, data) {
        res.redirect(data.link);
    });
};

module.exports.getAllUrlByUserId = function (req, res, next) {
    Url.find({authorId: req.params.id}, function (err, url) {
        if (err) {
            return next(err);
        }
        if (!url) {
            var error = new Error();
            error.message = 'Not Found';
            error.status = 404;
            return next(error);
        }
        return res.json(url);
    });
};

module.exports.updateUrlById = function (req, res, next) {
    Url.update({_id: req.params.id}, {
        $set: {
            content: req.body.content
        }
    }, function (err, modification) {
        if (err) {
            return next(err);
        }
        return res.json({url: modification});
    });
};

module.exports.deleteUrlByUserId = function (req, res, next) {

    Url.remove({authorId: req.params.id},
        function (err, modification) {
            if (err) {
                return next(err);
            }
            return res.json({url: modification});
        });
};

module.exports.deleteUrlById = function (req, res, next) {
    Url.remove({_id: req.params.id},
        function (err, modification) {
            if (err) {
                return next(err);
            }
            return res.json({url: modification});
        });
};