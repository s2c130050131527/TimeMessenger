'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _passportGoogleOauth = require('passport-google-oauth');

var _passportGoogleOauth2 = _interopRequireDefault(_passportGoogleOauth);

var _user = require('../components/models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GoogleStrategy = _passportGoogleOauth2.default.OAuth2Strategy;

var init = function init(passport) {

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    _user2.default.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new GoogleStrategy({

    clientID: _auth2.default.googleAuth.clientID,
    clientSecret: _auth2.default.googleAuth.clientSecret,
    callbackURL: _auth2.default.googleAuth.callbackURL,
    passReqToCallback: true
    // allows us to pass in the req from our route (
    // lets us check if a user is logged in or not)

  }, function (req, token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function () {

      // check if the user is already logged in
      if (!req.user) {

        _user2.default.findOne({ 'google.id': profile.id }, function (err, user) {
          if (err) return done(err);

          if (user) {

            // if there is a user id already but no token
            // (user was linked at one point and then rem
            // oved)
            if (!user.google.token) {
              user.google.token = token;
              user.google.name = profile.displayName;
              user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

              user.save(function (err) {
                if (err) return done(err);

                return done(null, user);
              });
            }

            return done(null, user);
          } else {
            var newUser = new _user2.default();

            newUser.google.id = profile.id;
            newUser.google.token = token;
            newUser.google.name = profile.displayName;
            newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

            newUser.save(function (err) {
              if (err) return done(err);

              return done(null, newUser);
            });
          }
        });
      } else {
        // user already exists and is logged in, we have to link accounts
        var user = req.user; // pull the user out of the session

        user.google.id = profile.id;
        user.google.token = token;
        user.google.name = profile.displayName;
        user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

        user.save(function (err) {
          if (err) return done(err);

          return done(null, user);
        });
      }
    });
  }));
};

exports.default = init;