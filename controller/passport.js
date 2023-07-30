const LocalStrtegy = require( 'passport-local' ).Strategy;
const mongoose = require( 'mongoose' );
const User = require( './../model/userModel' );
const bcrypt = require( 'bcryptjs' );



// compare password 
const comparePassword =async (candidatePass , userPass) =>
{
  const correct = await bcrypt.compare( candidatePass, userPass );
  return correct;
}

module.exports = function ( passport )
{
  passport.use(
    new LocalStrtegy( { usernameField: 'email' }, async ( email, password, cb ) =>
    { // check email 
      const user = await User.findOne( { email:email } );
      if ( !user )
      {
        return cb( null, false, { message: 'that email is not registered' } )
      }
      // compare password 
      const correct = await comparePassword( password, user.password );
      if ( correct ){
        return cb(null , user)
      }else{
        return cb( null, false, { message: 'password no correct ' } );
      }
    } )
  );

  // passport.serializeUser((user, cb)=> {
  //   cb(null, user.id);
  // } );

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {id: user.id});
    });
  });

  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });
}
