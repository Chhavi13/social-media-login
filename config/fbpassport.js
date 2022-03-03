
const passport =require('passport')

const strategy = require("passport-facebook");

const db = require('../models');
const FbUser = db.fbusers;

const FacebookStrategy = strategy.Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID:"513295643469775" ,
      clientSecret: "2c84255da61630bcad0f3af02e6601be",
      callbackURL: "http://localhost:5000/auth/facebook/callback",
      //profileFields: ["email", "name"]
    },async (accessToken, refreshToken, profile, done) => {
            //userProfile=profile;
        //     console.log(accessToken)
        // console.log(profile)
        //get the user data from google 
        console.log(profile.displayName)
        const { name} = profile._json;
        const newUser = {
             id: profile.id,
             displayName: profile.displayName,
         }
         try {

             //find the user in our database 
             let user = await FbUser.findOne({
               where:{
               id: profile.id }
             })
             if (user) {
                 //If user present in our database.
                 done(null, user)
             } else {
                 // if user is not preset in our database save user data to database.
                 user = await FbUser.create(newUser)
                 done(null, user)
             }



       } catch (error) {
            console.log(error)
        }

  }

  // function (accessToken, refreshToken, profile, done) {
  //   return done(null, profile);
  
  // }

  // async function(accessToken, refreshToken, profile, done) {
  //   const { email, first_name, last_name } = profile._json;
  //   const userData = {
  //     email,
  //     firstName: first_name,
  //     lastName: last_name
  //   };
  //   try {

  //                //find the user in our database 
  //                let user = await FbUser.findOne({
  //                  where:{
  //                  id: id }
  //                })
  //                if (user) {
  //                    //If user present in our database.
  //                    done(null, user)
  //                } else {
  //                    // if user is not preset in our database save user data to database.
  //                    user = await FbUser.create(userData)
  //                    done(null, user)
  //                }
    
    
    
  //            } catch (error) {
  //                console.log(error)
  //            }
    
  //      }
 
  
  )
);




module.exports =passport;