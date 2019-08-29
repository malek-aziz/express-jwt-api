'use sctrict';

var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config();

const mongodb_hostname = process.env.MONGODB_HOSTNAME;
const mongodb_databaseName = process.env.MONGODB_DATABASENAME;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        let uri = `mongodb+srv://${username}:${password}@${mongodb_hostname}/${mongodb_databaseName}`;
        console.log(uri);
        mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
            console.log('Database connection successful');
        })
            .catch(err => {
                console.error('Database connection error');
            })
    }
}

module.exports = new Database();