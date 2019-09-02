module.exports = {
    mongoDb: {
        hostname: process.env.MONGODB_HOSTNAME,
        databaseName: process.env.MONGODB_DATABASENAME,
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD
    },
    jwt: {
        key: process.env.JWT_KEY
    }
};