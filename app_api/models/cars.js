const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcryptjs');

const carSchema = new mongoose.Schema({ 
   brand: String,
   modelname: {
    type: String,
    required: true
  },
  standardtype: String,
  enginetype: String,
  seats: Number,
  miles: {
    type: Number,
    min: 0,
    default: 0
  },
  rating: Number,
  seattype: String
});

const userSchema = new mongoose.Schema({

    username: {
        type: String, 
        required: true
    }, email: {
        type: String, 
        required: true
    
    }, password: {
        type: String, 
        required: true
    }

});

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

mongoose.model('Cars', carSchema);

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Users', userSchema);