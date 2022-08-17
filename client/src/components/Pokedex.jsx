import React from 'react';
import Pokecard from './Pokecard.jsx'
import '../styles/Pokedex.css'

const Pokedex = ({pokedex}) => {
  return( <div className = 'pokedex-container'>
    <h1>Jason's Pokedex</h1>
    <div> {pokedex ? pokedex.map((pokemon, index) => {
      return <Pokecard pokemon = {pokemon} key = {index}/>
    }) : ''}</div>

  </div>
  )
}

export default Pokedex;