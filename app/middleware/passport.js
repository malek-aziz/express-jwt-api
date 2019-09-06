const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
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
    const user = await User.findOne({ email });

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