'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('./User/user.route');

var _user2 = _interopRequireDefault(_user);

var _passport = require('../config/passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var router = _express2.default.Router();
var initRoute = function initRoute(app, passport) {
  app.use(router);

  router.get('/', function (req, res) {
    res.send('Hello Worlds');
  });

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  // the callback after google has authenticated the user
  router.get('/auth/google/callback', passport.authenticate('ge', {
    successRedirect: '/api',
    failureRedirect: '/'
  }));

  router.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));

  // the callback after google has authorized the user
  router.get('/connect/google/callback', passport.authorize('google', {
    successRedirect: '/api',
    failureRedirect: '/'
  }));

  var apiRoute = _express2.default.Router();
  router.use('/api', isLoggedIn, apiRoute);
  apiRoute.get('/', function (req, res) {
    res.send('Hello API');
  });

  var userRoute = _express2.default.Router();
  apiRoute.use('/user', isLoggedIn, userRoute);
  var u = new _user2.default(userRoute);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect('/');
  }
};
exports.default = initRoute;