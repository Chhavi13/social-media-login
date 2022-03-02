const express = require('express')
const passport = require('passport')
const router = express.Router()




router.get('/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));



 
router.get('/google/callback', 
passport.authenticate('google', { failureRedirect: '/error' }),
(req, res)=> {
  // Successful authentication, redirect success.
  res.redirect('/log');
});


router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router