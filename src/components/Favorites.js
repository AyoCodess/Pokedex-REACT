import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteDisplay from './FavouriteDisplay';

function Favorites({
  savedPokemon,
  pokemonName,
  setPokemonName,
  pokemonDetail,
  setPokemonDetail,
}) {
  return (
    <>
      <div className='flex justify-between items-center mx-2'>
        <h1>Favorite Pokemon</h1>
        <Link to='/' className='border border-gray-200 p-2 shadow rounded-md'>
          Back
        </Link>
      </div>
      <FavoriteDisplay
        savedPokemon={savedPokemon}
        pokemonName={pokemonName}
        setPokemonName={setPokemonName}
        pokemonDetail={pokemonDetail}
        setPokemonDetail={setPokemonDetail}
      />
    </>
  );
}

export default Favorites;
