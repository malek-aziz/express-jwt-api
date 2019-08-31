'use strict'

var User = require('../models/UserModel');

module.exports = {
    index: (req, res) => {
        // User.get((err, users) => {
        //     if (err) {
        //         res.json({
        //             status: 'error',
        //             message: err
        //         });
        //     }
        //     res.json({
        //         status: 'success',
        //         message: 'Users retrieved successfully',
        //         data: users
        //     })
        // })
        res.send('get');
    },

    new: (req, res) => {
        res.send('create')
    },

    save: (req, res) => {
        res.send('update')
    },

    view: (req, res) => {
        res.send('delete')
    },

    update: (req, res) => {
        res.send('delete')
    },

    delete: (req, res) => {
        res.send('delete')
    },
}