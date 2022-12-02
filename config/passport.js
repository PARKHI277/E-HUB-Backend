var GoogleStrategy = require("passport-google-oauth20").Strategy;
const GoogleUser = require("../models/googleuser");
module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/users/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        // console.log("someone try to acees your account", profile);
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
        try {
          let user = await GoogleUser.find({ googleId: profile.id });
          if (user) {
            return done(null, user);
          } else {
            const newUser = {
             
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value
            };
            user = await GoogleUser.create(newUser);
            console.log("creating new user");
            done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    //GoogleUser.findById(id, function (err, user) {
      done(null, user);
   // });
  });
};
