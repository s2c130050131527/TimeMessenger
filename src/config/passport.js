import auth from './auth';
import GOAuth from 'passport-google-oauth';
import User from '../components/models/user';


const GoogleStrategy = GOAuth.OAuth2Strategy;

const init = (passport) => {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new GoogleStrategy({

    clientID: auth.googleAuth.clientID,
    clientSecret: auth.googleAuth.clientSecret,
    callbackURL: auth.googleAuth.callbackURL,
    passReqToCallback: true,
    // allows us to pass in the req from our route (
    // lets us check if a user is logged in or not)

  }, (req, token, refreshToken, profile, done) => {

    // asynchronous
    process.nextTick(() => {

      // check if the user is already logged in
      if (!req.user) {

        User.findOne({ 'google.id': profile.id }, (err, user) => {
          if (err)
            return done(err);

          if (user) {

            // if there is a user id already but no token
            // (user was linked at one point and then rem
            // oved)
            if (!user.google.token) {
              user.google.token = token;
              user.google.name = profile.displayName;
              user.google.email = (profile.emails[0].value || '')
                .toLowerCase(); // pull the first email

              user.save((err) => {
                if (err)
                  return done(err);

                return done(null, user);
              });
            }

            return done(null, user);
          } else {
            var newUser = new User();

            newUser.google.id = profile.id;
            newUser.google.token = token;
            newUser.google.name = profile.displayName;
            newUser.google.email = (profile.emails[0].value || '')
              .toLowerCase(); // pull the first email

            newUser.save((err) => {
              if (err)
                return done(err);

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
        user.google.email = (profile.emails[0].value || '')
          .toLowerCase(); // pull the first email

        user.save((err) => {
          if (err)
            return done(err);

          return done(null, user);
        });

      }

    });

  }));

};

export default init;
