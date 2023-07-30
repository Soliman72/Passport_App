const expressLayout = require( 'express-ejs-layouts' );
const express = require( 'express' );
const app = express();
const User = require( './model/userModel' );
const passport = require( 'passport' );
const flash = require( 'connect-flash' );
const session = require( 'express-session' );
const userRoute = require('./router/userRoute')
const indexRoute = require('./router/indexRoute')

require( './controller/passport' )( passport );

// Bodyparser
app.use( express.urlencoded( { extended: false } ) );

// Express Session 
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
} ) )

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use( flash() );

// Global vars 
app.use( ( req, res, next ) =>
{
  res.locals.success_msg = req.flash( 'success_msg' );
  res.locals.field_msg = req.flash( 'field_msg' );
  res.locals.error = req.flash( 'error' );
  next();
} );


// EJS
app.use( expressLayout );
app.set( 'view engine', 'ejs' );
// mounting
app.use( '/', indexRoute );
app.use( '/users', userRoute );




module.exports = app;