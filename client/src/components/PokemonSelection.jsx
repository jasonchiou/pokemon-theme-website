import React, {useState} from 'react';
import Pokecard from './Pokecard.jsx'
import UserPokemon from './UserPokemon.jsx'
import PokemonModal from './PokemonModal.jsx'
import '../styles/PokemonSelection.css'

const PokemonSelection = ({allPokemon, setUserPokemon, userPokemon}) => {

  const [searchTerm, setSearchTerm] = useState('');

  const [filter, setFilter] = useState('');

  const [showModal, toggleShowModal] = useState(false);

  const [modalPokemon, setModalPokemon] = useState({});

  const clearSearchTerm = (e) => {
    e.preventDefault();
    document.getElementsByClassName('pokemon-search-bar')[0].value = '';
    setSearchTerm('');
  }

  return(
    <div className = 'pokemon-selection-container'>
      <div className = 'pokedex-background'>
      <div className = 'pokedex-screen-container'>
      <UserPokemon userPokemon = {userPokemon}/>
      {showModal ?
      <PokemonModal
        pokemon = {modalPokemon}
        setUserPokemon = {setUserPokemon}
        toggleShowModal = {toggleShowModal}
      /> : ''}
      <form className = 'pokemon-generation-filter'onChange = {(e) => {setFilter(e.target.value)}}>

        <select className = 'pokemon-generation-select'name="generation" id="generation">
          <option value="">All (Gen 1-3)</option>
          <option value='1'>Gen 1</option>
          <option value='2'>Gen 2</option>
          <option value='3'>Gen 3</option>
        </select>
      </form>
      <form className = 'pokemon-list-options'>
        <input className = 'pokemon-search-bar' type='text' onChange = {(e) => setSearchTerm(e.target.value)}/>
        <button className = 'pokemon-search-clear-button'onClick = {clearSearchTerm}>Clear</button>
      </form>

      <div className = 'pokemon-grid-container'>
        {allPokemon.map((pokemon, index) => {
          if (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            pokemon.generation.includes(filter)) {
              return <Pokecard
                      pokemon = {pokemon}
                      key = {index}
                      setUserPokemon = {setUserPokemon}
                      toggleShowModal = {toggleShowModal}
                      showModal = {showModal}
                      setModalPokemon = {setModalPokemon}
                    />
          }
        })}
      </div>

      {/* <button onClick = {() => {console.log(showModal)}}>Debug</button> */}

      {/* <h2 className = 'gen-title'>Select a Pokemon!</h2> */}


      </div>
      </div>

  </div>
  )
}
export default PokemonSelection;