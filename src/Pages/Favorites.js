import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteDisplay from '../components/FavouriteDisplay';

function Favorites({
  savedPokemon,
  setSavedPokemon,
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
        setSavedPokemon={setSavedPokemon}
        pokemonName={pokemonName}
        setPokemonName={setPokemonName}
        pokemonDetail={pokemonDetail}
        setPokemonDetail={setPokemonDetail}
      />
    </>
  );
}

export default Favorites;
