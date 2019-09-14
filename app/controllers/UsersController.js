'use strict'

var jwt = require('jsonwebtoken');
var chalk = require('chalk');

var User = require('../models/UserModel');
var config = require('../../config/index');

var logger = console.log;

function getToken(user) {
    var { _id, role } = user;
    let token = jwt.sign({
        userId: _id,
        role: role
    }, config.jwt.key, {
        expiresIn: '7d'
    });
    return token;
}

module.exports = {
    login: async (req, res, next) => {
        const { user } = req;
        const token = getToken(user);
        user.token = token;
        user.password = 'N/A';
        User.findByIdAndUpdate(user._id, { token: token });
        return res.status(200).json(user);
    },

    loginRequired: async (req, res, next) => {
        res.status(200).json({
            mess: 'yêu cầu bạn phải login lại'
        })
    },

    ggAuth: async (req, res, next) => {
        const { user } = req;
        const token = getToken(user);
        user.token = token;
        user.password = 'N/A';
        await User.findByIdAndUpdate(user._id, { token: token });
        return res.status(200).json(user);
    },

    fbAuth: async (req, res, next) => {
        console.log(req);
        res.status(200).send('OK');
    },

    index: async (req, res, next) => {
        let { role } = req.user;
        const ac = global.ac;
        const permission = ac.can(role).readAny('user');

        logger('' + chalk.green(permission.granted));

        await User.find().select('-password -__v -token').then(result => {
            if (result === null || result.length === 0) {
                res.status(404).json({ mess: 'ERROR 404' });
            } else {
                res.status(200).json(result);
            }
        }).catch(err => {
            res.status(500).json({ mess: err.message });
        })
    },

    new: async (req, res, next) => {
        var user = new User(req.body);
        await user.save().then(result => {
            res.status(201).send(user);
        }).catch(err => {
            res.status(500).json({ mess: err.message });
        });
    },

    view: async (req, res, next) => {
        const { userId } = req.params;
        await User.findById(userId)
            .select('-password -__v')
            .then(result => {
                if (result === null || result.length === 0) {
                    res.status(404).json({ mess: 'ERROR 404' });
                } else {
                    res.status(200).json(result);
                }
            }).catch(err => {
                res.status(500).json({ mess: err.message });
            })
    },

    update: async (req, res, next) => {
        const id = req.params.userId;
        const userBody = req.body;
        await User.findOneAndUpdate({ _id: id }, {
            $set: userBody
        }, { new: true }).then(result => {
            if (result !== null) {
                res.status(202).json(result);
            } else {
                res.status(404).json({ mess: 'User not found' });
            }
        }).catch(err => {
            res.status(500).json({ mess: err.message });
        })
    },

    delete: async (req, res, next) => {
        const id = req.params.userId;
        await User.findOneAndDelete({ _id: id }).exec().then(result => {
            if (result !== null) {
                res.status(200).json({ mess: `Deleted user id:${result._id}` });
            } else {
                res.status(404).json({ mess: 'User not found' });
            }
        }).catch(err => {
            res.status(500).json({ mess: err.message });
        })
    },
}