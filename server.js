const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));


const googleStretagy = require('passport-google-oauth20')
passport.use(new googleStretagy({
  clientID:"859232362732-2iddsh5frjl1b5ikd7eu6oeqlupcebrc.apps.googleusercontent.com",
  clientSecret:"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",
  callbackURL:"http://localhost:5000/auth/google/callback"
},function(accessToken, refreshToken, profile, done) {
  userProfile=profile;
  console.log(accessToken)
 // console.log(userProfile)
  
  
  return done(null, userProfile);
}))

 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  (req, res)=> {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });



app.get('/', function(req, res) {
  res.render('pages/auth');
});

const port = process.env.PORT || 5000;
app.listen(port , () => console.log('App listening on port ' + port));