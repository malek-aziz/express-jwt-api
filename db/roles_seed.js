var dotenv = require('dotenv');
dotenv.config();

var database = require('./database');
var Role = require('../app/models/RoleModel');

var chalk = require('chalk');
var logger = console.log;

var grantsList = [
    { role: 'admin', resource: 'user', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'user', action: 'read:any', attributes: '*, !password, !__v' },
    { role: 'admin', resource: 'user', action: 'update:any', attributes: '*' },
    { role: 'admin', resource: 'user', action: 'delete:any', attributes: '*' },

    { role: 'user', resource: 'user', action: 'read:any', attributes: '*, !password, !__v' },
    { role: 'user', resource: 'user', action: 'update:own', attributes: '*, !token' },
    { role: 'user', resource: 'user', action: 'delete:own', attributes: '*' },

    { role: 'guest', resource: 'user', action: 'create:any', attributes: '*' }
];

async function dropAllRoles(){
    await Role.collection.drop();
    logger(chalk.red('deleted all roles in db'));
}

async function addGrantsList(){
    grantsList.forEach(async(grant) => {
        let role = new Role(grant);
        await role.save();
        logger('added role: '+ chalk.green(role));
    });
}

dropAllRoles();
addGrantsList();