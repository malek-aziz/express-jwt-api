'use strict'

var jwt = require('jsonwebtoken');

var User = require('../models/UserModel');
var config = require('../../config/index');

function getToken(user) {
    let { _id, role } = user;
    let token = jwt.sign({
        userId: _id,
        role: role
    }, config.jwt.key, {
        expiresIn: '7d'
    });
    return token;
}

module.exports = {
    login: (req, res, next) => {
        let { user } = req;
        let token = getToken(user);
        user.token = token;
        user.password = 'N/A';
        User.findByIdAndUpdate(user._id, { token: token });
        return res.status(200).json(user);
    },

    loginRequired: (req, res, next) => {
        res.status(200).json({
            mess: 'yêu cầu bạn phải login lại'
        })
    },

    ggAuth: (req, res, next) => {
        let { user } = req;
        let token = getToken(user);
        user.token = token;
        user.password = 'N/A';
        User.findByIdAndUpdate(user._id, { token: token });
        return res.status(200).json(user);
    },

    fbAuth: (req, res, next) => {
        console.log(req);
        res.status(200).send('OK');
    },

    index: (req, res, next) => {
        let { role } = req.user;
        let ac = global.ac;
        let permission = ac.can(role).readAny('user');

        User.find().exec().then(results => {
            if (results === null || results.length === 0) {
                res.status(404).json({ mess: 'ERROR 404' });
            } else {
                let data = JSON.parse(JSON.stringify(results));
                let filtered = permission.filter(data);
                res.status(200).json(filtered);
            }
        }).catch(err => {
            res.status(500).json({ mess: err.message });
        })
    },

    new: (req, res, next) => {
        let user = new User(req.body);
        user.save().then(result => {
            res.status(201).send(user);
        }).catch(err => {
            res.status(500).json({ mess: err.message });
        });
    },

    view: (req, res, next) => {
        let { userId } = req.params;
        User.findById(userId)
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

    update: (req, res, next) => {
        let id = req.params.userId;
        let userBody = req.body;
        User.findOneAndUpdate({ _id: id }, {
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

    delete: (req, res, next) => {
        let id = req.params.userId;
        User.findOneAndDelete({ _id: id }).exec().then(result => {
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