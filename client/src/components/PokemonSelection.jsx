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
      <UserPokemon userPokemon = {userPokemon}/>
      {showModal ? <PokemonModal pokemon = {modalPokemon} setUserPokemon = {setUserPokemon} toggleShowModal = {toggleShowModal}/> : ''}
      <button onClick = {() => {console.log(showModal)}}>Debug</button>
      <h2 className = 'gen-title'>Select a Pokemon!</h2>
      <form onChange = {(e) => {setFilter(e.target.value)}}>
        <label for="generation">Generation(s) shown: </label>
        <select name="generation" id="generation">
          <option value="">All (Gen 1-3)</option>
          <option value="Gen 1">Gen 1</option>
          <option value="Gen 2">Gen 2</option>
          <option value="Gen 3">Gen 3</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
      <form className = 'pokemon-list-options'>
        <input className = 'pokemon-search-bar' type='text' onChange = {(e) => setSearchTerm(e.target.value)}/>
        <button onClick = {clearSearchTerm}>Clear</button>
      </form>

      <div className = 'pokemon-gen-container'>
        {filter === '' || filter === 'Gen 1' ? allPokemon.map((pokemon, index) => {
          if (pokemon.name.includes(searchTerm.toLowerCase())) {
            return <Pokecard pokemon = {pokemon} key = {index} setUserPokemon = {setUserPokemon} toggleShowModal = {toggleShowModal} showModal = {showModal} setModalPokemon = {setModalPokemon}/>
          }
        }) : ''}

        {/* {filter === '' || filter === 'Gen 2' ? gen2Pokemon.map((pokemon, index) => {
          if (pokemon.name.includes(searchTerm.toLowerCase())) {
            return <Pokecard pokemon = {pokemon} key = {index}setUserPokemon = {setUserPokemon}/>
          }

        }): ''}

        {filter === '' || filter === 'Gen 3' ? gen3Pokemon.map((pokemon, index) => {
          if (pokemon.name.includes(searchTerm.toLowerCase())) {
            return <Pokecard pokemon = {pokemon} key = {index} setUserPokemon = {setUserPokemon}/>
          }

        }) : ''} */}
</div>


      <div>

      </div>

    </div>
  )
}

export default PokemonSelection;