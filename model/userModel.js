const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcryptjs' );

const userSchema = new mongoose.Schema( {
  name: {
    type: String,
    trim: true,
    required: [ true, 'user must have a name!' ]
  },
  email: {
    type: String,
    required: [ true, 'user must have a email!' ]
  },
  password: {
    type: String,
    required: [ true, 'user must have a password!' ]
  },
  Date: {
    type: Date,
    default: Date.now
  },
} );
// hash password 
userSchema.pre( 'save', async function (next)
{
  // if password changed 
  if ( !this.isModified( 'password' ) ) next();
  //hash Password
  this.password = await bcrypt.hash( this.password, 12 );
  next();
})

// compare password 
// userSchema.methods.comparePassword =async (candidatePass , userPass) =>
// {
//   const correct = await bcrypt.compare( candidatePass, userPass );
//   return correct;
// }




const User = mongoose.model( 'User', userSchema );

module.exports = User;