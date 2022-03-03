const router = require('express').Router()
//importing middleware
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureGuest ,(req, res) => {
    res.render('login')
  })

router.get("/log",ensureAuth, async(req,res)=>{
    res.render('index',{userinfo:req.user})
    //console.log(userinfo)
})

router.get('/profile', ensureAuth, function (req, res) {
  res.render('profile', {
    user: req.user // get the user out of session and pass to template
  });
});

router.get('/error', ensureAuth, function (req, res) {
  res.render('error');
});



module.exports=router;