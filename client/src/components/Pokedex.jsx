import React from 'react';
import Pokecard from './Pokecard.jsx'

const Pokedex = ({pokedex}) => {
  return( <div>
    <h1>Pokedex</h1>
    <div> {pokedex ? pokedex.map((pokemon, index) => {
      return <Pokecard pokemon = {pokemon} key = {index}/>
    }) : ''}</div>

  </div>
  )
}

export default Pokedex;