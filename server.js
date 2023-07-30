const mongoose = require( 'mongoose' );

const dotenv = require( 'dotenv' );
dotenv.config( { path: './config.env' } );

const app = require( './app' )

const DB = process.env.DATABASE.replace( '<PASSWORD>', process.env.DATABASE_PASSWORD );

mongoose
  .connect( DB, {
  useNewUrlParser: true,
  // useFindAndModify: false,
  // useCreateIndex :true,
  useUnifiedTopology: true
} )
  .then( () => { console.log( 'DB  was connected ...' ); } )
  .catch( err => { console.log( err ); } )


const port = process.env.PORT || 3000

  app.listen( port, () =>
{
  console.log(`server running on port ${port}...`);
} )