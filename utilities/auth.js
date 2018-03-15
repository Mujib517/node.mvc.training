const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
var config = require('./config');
var userCtrl = require('../controllers/user.ctrl');

function ConfigureAuth(app) {

    app.use(session({ secret: config.password }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function (username, done) {
        done(null, username);
    });

    passport.use('local', new LocalStrategy(userCtrl.login));
}

module.exports = ConfigureAuth;


