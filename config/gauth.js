const passport=require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/user");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri:"http://localhost:3000/api/users/auth/google/callback"

  },
  async(accessToken, refreshToken, profile, cb)=> {
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value,
      email: profile.emails[0].value
    }

    try {
      //find the user in our database 
      let user = await User.findOne({ googleId: profile.id })

      if (user) {
        //If user present in our database.
        done(null, user)
      } else {
        // if user is not preset in our database save user data to database.
        user = await User.create(newUser)
        done(null, user)
      }
    } catch (err) {
      console.error(err)
    }
  }
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
 //   return cb(err, profile);
));
passport.serializeUser(function(user,done){done(null,user);});

passport.deserializeUser(function(user,done){done(null,user);});