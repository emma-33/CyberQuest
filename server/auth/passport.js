const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJWT = passportJWT.ExtractJwt;
const StrategyJWT = passportJWT.Strategy;

const User = require('../models/user_model');

passport.use(
    new StrategyJWT(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        async function (jwtPayload, done) {
            try {
                const user = await User.findOne({ where: { id: jwtPayload.id } });
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);