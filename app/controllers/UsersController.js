'use strict'

var User = require('../models/UserModel');

module.exports = {
    login: (req, res, next) => {

    },

    index: (req, res, next) => {
        User.find().select('name username email admin').then(result => {
            if (result === null || result.length === 0) {
                res.status(404).json({ mess: 'ERROR 404' });
            } else {
                res.status(200).json(result);
            }
        }).catch(err => {
            res.status(500).json({ mess: err.message });
        })
    },

    new: (req, res, next) => {
        var user = new User(req.body);
        user.save().then(result => {
            res.status(201).send(user);
        }).catch(err => {
            res.status(500).json({ mess: err.message });
        });
    },

    view: (req, res, next) => {
        console.log(req.query);
        User.findOne({
            email: req.query.userId
        }).then(mess => {
            res.json({ mess });
        }).catch(err => {
            res.status(500).json({ mess: err.message });
        })
    },

    update: (req, res, next) => {
        const id = req.params.userId;
        const userBody = req.body;
        User.findOneAndUpdate({ _id: id }, {
            $set: userBody
        }).exec().then(result => {
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
        const id = req.params.userId;
        User.findOneAndDelete({ _id: id }).exec().then(result => {
            if (result !== null) {
                res.status(202).json({ mess: `Deleted user id:${result._id}` });
            } else {
                res.status(404).json({ mess: 'User not found' });
            }
        }).catch(err => {
            res.status(500).json({ mess: err.message });
        })
    },
}