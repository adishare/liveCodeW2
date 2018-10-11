const UserModel = require("../models/UserModel.js");
const helpers = require("../helpers");
const ObjectId = require("mongoose").Types.ObjectId;
var request = require('request')
const jwt = require('jsonwebtoken')
const CartModel = require('../models/CartModel.js')

module.exports = {

    checkToken(req, res, next) {
        if (!req.headers.token) {
            res.status(401).json({
                message: "Unauthorized Access, please signin"
            });
        } else {
            next();
        }
    },

    checkifTokenValid(req, res, next) {
        let id;
        try {
            id = helpers.decodeToken(req.headers.token).id;

            UserModel.findById(ObjectId(id))
                .then(userFound => {
                    if (userFound) {
                        req.headers.userId = userFound._id;
                        next();
                    } else {
                        res.status(204).json({
                            message: "Invalid Token"
                        });
                    }
                })
                .catch(err => {
                    res.status(400).json({
                        message: err
                    });
                });

        } catch (err) {
            res.status(400).json({
                message: "Invalid Creditial"
            });
        }
    },

    verifyToken(req, res) {
        UserModel.findById(
                ObjectId(helpers.decodeToken(req.body.token).id)
            )
            .then(userFound => {
                if (userFound) {
                    res.status(200).json({
                        message: "OK",
                        data: {
                            name: userFound.name
                        }
                    });
                } else {
                    res.status(204).json({
                        message: "Not Found"
                    });
                }
            })
            .catch(err => {
                res.status(400).json({
                    message: err
                });
            });
    },

    login(req, res) {
        UserModel.findOne({
                username: req.body.username
            })
            .exec()
            .then((user) => {
                if (user && helpers.compareSync(req.body.password, user.password)) {
                    let token = helpers.createToken({
                        id: user._id.toString()
                    })
                    res.status(200).json({
                        message: "Login Success",
                        token: token
                    })
                } else if (user !== null && req.body.password !== user.password) {
                    res.status(400).json({
                        message: "Wrong Password"
                    })
                } else {
                    res.status(400).json({
                        message: "Wrong Username & Password"
                    })
                }
            })
            .catch(err => {
                res.status(402).json(err);
            });
    },


}