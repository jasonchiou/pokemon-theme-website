import React from 'react';
import Pokecard from './Pokecard.jsx'

const UserPokemon = ({userPokemon}) => {
  if (userPokemon.name !== undefined) {
    return (
      <div>
        <span>Your pokemon: </span>
         <Pokecard pokemon = {userPokemon}/>
      </div>

    )
  }
  return <div>{userPokemon.name}</div>
}

export default UserPokemon;