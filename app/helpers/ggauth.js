const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../../config/index');

module.exports = (passport) => {
    passport.serializeUser((user, done)=>{
        done(null, user);
    });
    passport.deserializeUser((user, done)=>{
        done(null, user);
    });

    passport.use(new GoogleStrategy({
        clientID: config.ggAuth.clientID,
        clientSecret: config.ggAuth.clientSecret,
        callbackURL: config.api.domain + '/google-auth-callback'
    },
    (token, refreshToken, profile, done)=>{
        return done(null, {
            profile: profile,
            token: token
        });
    }));
}