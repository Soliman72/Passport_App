// welcome 
exports.homePage = ( req, res ) =>
{
  res.render('welcome')
}

// dashboard 
exports.dashboard = ( req, res ) =>
{
  res.render( 'dashboard', {
    user : req.user
  } );
}