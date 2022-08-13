import './styles/App.css';
import React from 'react';
import PokemonSelection from './components/PokemonSelection.jsx'
import axios from 'axios';
import UserPokemon from './components/UserPokemon.jsx'
import Pokedex from './components/Pokedex.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPokemon: [],
      userPokemon: {},
      pokedex: []
    }
    this.getGen123Pokemon = this.getGen123Pokemon.bind(this);
    this.updatePokemonState = this.updatePokemonState.bind(this);
    this.setUserPokemon = this.setUserPokemon.bind(this);
    this.getPokedex = this.getPokedex.bind(this);
    this.addToPokedex = this.addToPokedex.bind(this);
  }

  componentDidMount() {
    this.getGen123Pokemon();
    this.getPokedex();
    this.updateUserPokemonIfExists();
  }

  updatePokemonState(pokemon) {
    this.setState({
      allPokemon: pokemon
    })
  }

  updatePokedex(pokedex) {
    this.setState({pokedex: pokedex})
  }

  updateUserPokemonIfExists() {
    let userPokemon = JSON.parse(localStorage.getItem('userPokemon')) || {};
    this.setState({userPokemon: userPokemon})
  }

  setUserPokemon(pokemon) {
    this.setState({userPokemon: pokemon})
    let pokemonString = JSON.stringify(pokemon)
    localStorage.setItem("userPokemon", pokemonString)
    this.addToPokedex(pokemon)
  }

  getGen123Pokemon() {
    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=386&offset=0')
    .then(response => {
      let pokemonData = response.data.results.slice();
      for (let i = 0; i < pokemonData.length; i++) {
        pokemonData[i]['imgUrl'] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`
        let capitalized = pokemonData[i]['name'].charAt(0).toUpperCase() + pokemonData[i]['name'].slice(1);
        pokemonData[i]['name'] = capitalized;
        if (i < 152) {
          pokemonData['generation'] = 1;
        } else if (i > 252) {
          pokemonData['generation'] = 2;
        } else if (i > 387){
          pokemonData['generation'] = 3;
        }
      }
      this.updatePokemonState(pokemonData);
    })
    .catch((err) => {
      console.error('errored in getGen1Pokemon: ', err)
    })
  }

  getPokedex() {
    axios.get('http://127.0.0.1:9500/pokedex')
    .then((response) => {
      this.updatePokedex(response.data);
    })
    .catch((err) => {
      console.error('errored in getPokedex', err)
    })
  }

  addToPokedex(pokemon) {
    axios.post('http://127.0.0.1:9500/pokedex', pokemon)
    .then((response) => {
      console.log('successfully posted to the server')
      this.getPokedex();
    })
    .catch((err) => {
      console.error('errored in addToPokedex', err)
    })
  }


  showState() {
    console.log(this.state)
  }


  render() {
    return (
      <div className="App">
         {/* <button onClick = {this.showState.bind(this)}>Show State</button> */}
         <div className = 'pokedex-background'>
          <div className = 'pokedex-screen'>
            <PokemonSelection allPokemon = {this.state.allPokemon} setUserPokemon = {this.setUserPokemon} userPokemon = {this.state.userPokemon}/>
            <Pokedex pokedex = {this.state.pokedex}/>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
