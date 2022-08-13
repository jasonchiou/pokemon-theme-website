const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/pokedex')
const db = mongoose.connection;
db.on('error', function() {
  console.error('unable to connect to db')
});
db.once('open', function() {
  console.log('connected to db on port 27017!')
})



module.exports = db;