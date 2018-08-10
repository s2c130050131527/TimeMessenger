import express from 'express';
import UserRoutes from './User/user.route';
import init from '../config/passport';
const router = express.Router();
const initRoute = (app, passport) => {
  app.use(router);

  router.get('/', (req, res) => {
    res.send('Hello Worlds');
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

  // the callback after google has authenticated the user
  router.get('/auth/google/callback',
    passport.authenticate('ge', {
      successRedirect: '/api',
      failureRedirect: '/',
    }));


  router.get('/connect/google',
    passport.authorize('google', { scope: ['profile', 'email'] }));

  // the callback after google has authorized the user
  router.get('/connect/google/callback',
    passport.authorize('google', {
      successRedirect: '/api',
      failureRedirect: '/',
    }));

  const apiRoute = express.Router();
  router.use('/api', isLoggedIn, apiRoute);
  apiRoute.get('/', (req, res) => {
    res.send('Hello API');
  });

  const userRoute = express.Router();
  apiRoute.use('/user', isLoggedIn, userRoute);
  const u = new UserRoutes(userRoute);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();

    res.redirect('/');
  }
};
export default initRoute;
