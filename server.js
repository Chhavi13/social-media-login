const express = require('express');
const app = express();
const session = require('express-session');
const dotenv =require('dotenv')
dotenv.config({path:'config/config.env'})
const db =require('./models')
const passport = require('passport');
const auth =require('./routes/auth')
require('./config/passport')(passport)

db.sequelize.sync();
app.set('view engine', 'ejs');
app.set('views','./views')
//app.use(express.json());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//app.use(express.urlencoded({extended:true}))
 

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.use(passport.initialize());


app.use(passport.session());



app.use(require("./routes/index"))
app.use('/auth',auth )
// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });


// app.get('/success', (req, res) => res.send(userProfile));
// app.get('/error', (req, res) => res.send("error logging in"));



// app.get('/', function(req, res) {
//   res.render('auth');
// });


const port = process.env.PORT || 2000
app.listen(port , () => console.log('App listening on port ' + port));