const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const config = require('../../config/index');
const User = require('../models/UserModel');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.jwt.key
}, async (payload, done) => {
    try {
        console.log(payload.userId);
        // Tìm user torng database
        const user = await User.findById(payload.userId);
        
        // Nếu user ko tồn tại, handle it
        if(!user){
            return done(null, false);
        }
        // nếu ko, return user
        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));