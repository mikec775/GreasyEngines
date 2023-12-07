const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

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


mongoose.model('Cars', carSchema);

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Users', userSchema);