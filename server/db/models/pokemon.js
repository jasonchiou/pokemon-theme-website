const mongoose = require('mongoose');
const pokemonSchema = new mongoose.Schema({
  name: {type: String, required: true},
  url: {type: String, required: true},
  imgUrl: {type: String, required: true}
})

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;