var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var loginmodel = require('../data/login.model');
var db = require('../data/db');


module.exports = function(passport)
{
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = db.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>
    {
        loginmodel.getUserById(jwt_payload._doc_._id, (err, user)=>
        {
            if(err)
            {
                return done(err, false);
            }
            if(user)
            {
                return done(null, user);
            } else{
                return done(null, false);
            }
        });
    }));

};