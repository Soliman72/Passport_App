module.exports = {
  ensureAuthenicate: function ( req, res, next )
  {
    if ( req.isAuthenticated() ) return next();

    req.flash( 'field_msg', 'please login to overview this page ' );
    res.redirect( '/users/login' );
  }
}