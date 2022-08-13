import React from 'react';
import '../styles/Pokecard.css'

const Pokecard = ({pokemon, setSelectedPokemon, toggleShowModal, showModal, setModalPokemon}) => {

  const handleCardClick = (e) => {
    toggleShowModal(true);
    setModalPokemon(pokemon);
  }

  return (
    <span className = 'pokecard'>
    <figure onClick = {handleCardClick} className = 'pokecard-container' value = {pokemon}>
      <img src = {pokemon.imgUrl} alt = 'missing'></img>
      <figcaption className = 'pokemon-name'>{pokemon.name}</figcaption>
    </figure>
    </span>
  )
}

export default Pokecard;