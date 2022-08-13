const express = require ('express')
const app = express();
const port = 9500;
const controllers = require('../db/controllers/pokemon.js')
const db = require('../db/index.js')

const cors = require('cors');
const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
// app.use(express.static(__dirname + '/../clien'))

app.get('/pokedex', controllers.getPokemon);
app.post('/pokedex', controllers.addPokemon);
app.put('/pokedex', controllers.findAndReplacePokemon);


app.listen(port, () => {
  console.log('SERVER LISTENING ON :', port)
})