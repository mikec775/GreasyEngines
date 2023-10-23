const mongoose = require('mongoose');
const dbURI = "mongodb+srv://user1:mtu12345@cluster0.tryw2c0.mongodb.net/Greasers?retryWrites=true&w=majority";


try {
   
mongoose.connect(
    dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {console.log(" Mongoose is connected")},
	err=> {console.log(err)}
	);
}
 catch (e) {
  console.log("could not connect");
}
require('./cars');
