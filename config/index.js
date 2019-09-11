module.exports = {
    api: {
        domain: process.env.API_DOMAIN
    },
    mongoDb: {
        hostname: process.env.MONGODB_HOSTNAME,
        databaseName: process.env.MONGODB_DATABASENAME,
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD
    },
    jwt: {
        key: process.env.JWT_KEY
    },
    ggAuth: {
        clientID: process.env.GG_CLIENT_ID,
        clientSecret: process.env.GG_CLIENT_SECRET
    },
    fbAuth: {
        appID: process.env.FB_APP_ID,
        appSecret: process.env.FB_APP_SECRET,
        displayName: process.env.FB_DISPLAY_NAME
    }
};