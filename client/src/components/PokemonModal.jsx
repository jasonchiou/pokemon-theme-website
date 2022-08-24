import React from 'react';
import axios from 'axios';
import '../styles/PokemonModal.css'
import '../styles/Pokeball.css'

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
      species: '',
      showGottaCatchEmAll: false,
      description: ''
    }
    this.fetchPokemonInfo = this.fetchPokemonInfo.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleUserSetPokemon = this.handleUserSetPokemon.bind(this);
    this.handleModalExit = this.handleModalExit.bind(this);
    this.fetchPokemonDescription = this.fetchPokemonDescription.bind(this);
  }

  componentDidMount() {
    this.fetchPokemonInfo();
    this.fetchPokemonDescription();
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

  updateDescription(description) {
    this.setState({
      description: description
    })
  }

  handleModalExit() {
    this.props.toggleShowModal(false);
  }

  handleUserSetPokemon(e) {
    e.preventDefault();
    this.props.setUserPokemon(this.props.pokemon);
    this.setState({
      showGottaCatchEmAll: true
    })
    setTimeout(() => {
      this.props.toggleShowModal();
    }, 5000)
  }


  fetchPokemonInfo (){
    console.log(`fetching! ${this.props.pokemon.name.toLowerCase()}'s info`)
    let path = `https://pokeapi.co/api/v2/pokemon/${this.props.pokemon.name.toLowerCase()}`
    axios.get(path)
    .then((response) => {
      console.log(response)
     this.updateState(response.data);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  fetchPokemonDescription(pokemonInfo) {
    let path = `https://pokeapi.co/api/v2/pokemon-species/${this.props.pokemon.name.toLowerCase()}`
    axios.get(path)
    .then((response) => {
      console.log('pokemon description', response);
      this.updateDescription(response.data.flavor_text_entries[0].flavor_text)
    })
  }

  render () {
    return (
      <div className = 'pokemon-modal-container'>

        <div className = 'pokemon-modal-info'>
          <img className = 'pokemon-modal-image' src = {this.props.pokemon.imgUrl} alt='missing'/>
          <div className = 'pokemon-details'>
            <div>{('000' + this.state.number).substr(-3)}  {this.props.pokemon.name}</div>
            <br></br>
            <div>TYPE: {this.state.types.map((slot, index) => {
              return <span key = {index}> {slot.type.name.toUpperCase()} </span>
            })}</div>
            <br></br>
            <div>HT {this.state.height} m</div>
            <br></br>
            <div>WT {this.state.weight} kg</div>
          </div>

          {/* <button onClick = {() => {
            console.log(this.state);
          }}>Show Pokemon data</button> */}
          <br></br>

        </div>
        <br></br>

        <div className = 'pokemon-modal-description'>
          {this.state.description}
        </div>
        <div className = 'selection-buttons'>
          <button className = 'clickable-button' onClick = {this.handleUserSetPokemon}>Choose this Pokemon</button>
          <button className = 'clickable-button' onClick = {this.handleModalExit}>Cancel</button>
        </div>
        <div className = 'gotta-catch-em-all'>
          {this.state.showGottaCatchEmAll ?
           <div className = 'pokeball_container'>
           <div class="pokeball">
             <div class="pokeball__button"></div>
           </div>
           </div> : ''}
        </div>
      </div>
    )
  }

}

export default PokemonModal;