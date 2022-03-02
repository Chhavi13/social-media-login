const googleStretagy = require('passport-google-oauth20').Strategy
const dbconfig = require('../config/db.config')
const Sequelize = require("sequelize");
const db = require('../models');
const User = db.users;


module.exports = (passport) => {
    passport.use(new googleStretagy({
        clientID: "859232362732-2iddsh5frjl1b5ikd7eu6oeqlupcebrc.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:5000/auth/google/callback"
    }, async (accessToken, refreshToken, profile, done) => {
        //     userProfile=profile;
        //     console.log(accessToken)
        //    // console.log(userProfile)
        //get the user data from google 
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



        } catch (error) {
            console.log(error)
        }

    }))// used to serialize the user for the session
    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });

}
