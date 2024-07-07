const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('./models/userModel');

const ExtractJWT = passportJWT.ExtractJwt;
const StrategyJWT = passportJWT.Strategy;

passport.use(
    new StrategyJWT(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        async (jwtPayload, done) => {
            try {
              const user = await User.findOne({ where: { id: jwtPayload.userId } });
              if (user) {
                return done(null, user);
              } else {
                return done(null, false);
              }
            } catch (err) {
                return done(err, false);
            }
        }
    )
);

module.exports = passport;
