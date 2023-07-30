const express = require( 'express' );
const userController = require('./../controller/userController')
const router = express.Router()

router.get( '/login',( req, res ) =>
{
  res.render('login')
} );

router.get( '/register', ( req, res ) =>
{
  res.render('register')
} );

router.post('/register' ,userController.register )
router.post('/login' ,userController.login )
router.get('/logout' ,userController.logout )

module.exports = router;