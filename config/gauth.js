// const passport=require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const GoogleUser = require("../models/googleuser");

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     redirect_uri:"http://localhost:3000/api/users/auth/google/callback"

//   },
//   async function(accessToken, refreshToken, profile,done) {
//     try {
//       let user = await GoogleUser.findOne({ googleId: profile.id })

//       if (user) {
//         //If user present in our database.
//         done(null, user)
//       } else {
//         const newUser = {
//           googleId: profile.id,
//           name: profile.displayName, 
//           email: profile.emails[0].value
//         }
    
//         user = await GoogleUser.create(newUser);
//         console.log("creating new user");
//         done(null, user)
//       }
//     } catch (err) {
//       console.error(err)
//     }
//   }
// ));
// passport.serializeUser(function(user,done){done(null,user);});

// passport.deserializeUser(function(user,done){done(null,user);});