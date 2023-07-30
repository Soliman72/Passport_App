const passport = require( 'passport' );
const User = require( './../model/userModel' )

exports.register =async ( req, res ) =>
{
  const { name, email, password, password2 } = req.body;

  let errors = [];

  // check fields exist 
  if ( !name || !email || !password || !password2 )
  {
    errors.push( { msg: 'you have to fill fields' } );
  }

  // check password same 
  if ( password2 !== password )
  {
    errors.push( { msg: 'you have to write same password in ConfirmPassword' } );
  }

  // check password.length 
  if ( password.length < 6 )
  {
    errors.push( { msg: 'password must at least 6 characters' } );
  }

  if ( errors.length > 0 )
  {
    res.render( 'register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else
  {    
    // if user exist 
    const user = await User.findOne( { email } );
    if ( user )
    {
      errors.push( { msg: 'user already exist' } );
      return res.render( 'register', {
      errors,
      name,
      email,
      password,
      password2
      })
    }
    // create user in db
    const newUser = await User.create( {
      name,
      email,
      password
    } );
    req.flash('success_msg' , 'you register success , you can login')
    res.redirect( '/users/login' );
  }
}

// login 
exports.login = ( req, res,next ) =>
{
  passport.authenticate( 'local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })( req, res, next );
};
  
//logout 
exports.logout = ( req, res ) =>
{
  req.logout;
  req.flash( 'success_msg', 'you are doesn\'t login any more ' );
  res.redirect('/users/login');
}







