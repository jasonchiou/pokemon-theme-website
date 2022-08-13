import React from 'react';
import axios from 'axios';
import '../styles/PokemonModal.css'

class PokemonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: null,
      types: [],
      moves: [],
      height: null,
      weight: null,
      species: ''
    }
    this.fetchPokemonInfo = this.fetchPokemonInfo.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleUserSetPokemon = this.handleUserSetPokemon.bind(this);
    this.handleModalExit = this.handleModalExit.bind(this);
  }

  componentDidMount() {
    this.fetchPokemonInfo();
  }

  updateState(pokemonData) {
    this.setState({
      name: this.props.pokemon.name,
      number: pokemonData.id,
      types: pokemonData.types,
      moves: pokemonData.moves,
      height: (pokemonData.height / 10).toFixed(1),
      weight: (pokemonData.weight / 10).toFixed(1),
      species: pokemonData.species
    })
  }

  handleModalExit() {
    this.props.toggleShowModal(false);
  }

  handleUserSetPokemon(e) {
    e.preventDefault();
    this.props.setUserPokemon(this.props.pokemon);
  }


  fetchPokemonInfo (){
    console.log(`fetching ${this.props.pokemon.name.toLowerCase()}'s info`)
    let path = `https://pokeapi.co/api/v2/pokemon/${this.props.pokemon.name.toLowerCase()}`
    axios.get(path)
    .then((response) => {
     this.updateState(response.data);
    })
    .catch((err) => {
      console.error(err);
    })
  }
  render () {
    return (
      <div className = 'pokemon-modal-container'>

        <div className = 'pokemon-modal-info'>
          <img src = {this.props.pokemon.imgUrl} alt='missing'/>
          <div>{this.state.number}  {this.props.pokemon.name}</div>
          <div>{this.state.types.map((slot, index) => {
            return <span key = {index}> {slot.type.name} </span>
          })}</div>
          <div>{this.state.height} m</div>
          <div>{this.state.weight} kg</div>

          <button onClick = {() => {
            console.log(this.state);
          }}>Show Pokemon data</button>
          <br></br>
          <button onClick = {this.handleUserSetPokemon}>Choose this Pokemon</button>
          <button onClick = {this.handleModalExit}>Cancel</button>
        </div>


      </div>
    )
  }

}

export default PokemonModal;