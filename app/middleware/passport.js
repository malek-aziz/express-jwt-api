const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-plus-token');
const FacebookStrategy = require('passport-facebook-token');
const { ExtractJwt } = require('passport-jwt');
const config = require('../../config/index');
const User = require('../models/UserModel');


// Request using JWT
passport.use(new JwtStrategy({ 
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.jwt.key
}, async (payload, done) => {
    try {
        // Tìm user torng database
        const user = await User.findById(payload.userId);

        // Nếu user ko tồn tại, handle it
        if (!user) {
            return done(null, false);
        }
        // nếu ko, return user
        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));

// Login using username && password
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const user = await User.findOne({ email }).select('-__v');

    if (!user) {
        return done(null, false);
    }

    await user.verifyPassword(password).then(valid => {
        if (!valid) {
            return done(null, false);
        } else {
            done(null, user);
        }
    })

}));

// Login using google auth
passport.use('googleToken', new GoogleStrategy({
    clientID: config.ggAuth.clientID,
    clientSecret: config.ggAuth.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    // console.log('accessToken', accessToken);
    // console.log('refreshToken', refreshToken);
    // console.log('profile', profile);

    const user = await User.findOne({
        email: profile.emails[0].value
    });

    if (!user) {
        var newUser = new User({
            email: profile.emails[0].value,
            name: profile.name.familyName + ' ' + profile.name.givenName,
            password: '12345678'
        });
        newUser.save();
        return done(null, newUser);
    }
    return done(null, user);
}));


// Login using facebook auth
passport.use('facebookToken', new FacebookStrategy({
    clientID: config.fbAuth.appID,
    clientSecret: config.fbAuth.appSecret
}, async (accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    return done(null, null);
}));