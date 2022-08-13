const Pokemon = require('../models/pokemon.js')
const db = require('../index.js')

const getPokemon = (req, res) => {
  console.log('getPokemon was invoked!')
  Pokemon.find({})
  .then((result) => {
    res.send(result);
  })
}

const addPokemon = (req, res) => {
  const newPokemon = new Pokemon({
    name: req.body.name,
    url: req.body.url,
    imgUrl: req.body.imgUrl
  })
  console.log('adding pokemon to pokedex', newPokemon)

  newPokemon.save()
  .then((result) => {
    res.send('successfully added pokemon to pokedex!')
  })
  .catch((err) => {
    res.status(400);
    res.send('unable to post pokemon');
  })
}

const findAndReplacePokemon = (req, res) => {
  console.log('findAndReplace was invoked', req.body);
}

module.exports = {getPokemon, addPokemon, findAndReplacePokemon};