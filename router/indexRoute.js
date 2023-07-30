const express = require( 'express' );
const indexController = require('./../controller/indexController')
const router = express.Router();
const { ensureAuthenicate } = require( './../controller/auth' );

router.get( '/', indexController.homePage );
router.get( '/dashboard',ensureAuthenicate , indexController.dashboard );

module.exports = router;