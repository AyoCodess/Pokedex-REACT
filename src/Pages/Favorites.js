import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteDisplay from '../components/FavoriteDisplay';

function Favorites({
  pokemonName,
  setPokemonName,
  pokemonDetail,
  setPokemonDetail,
  database,
  setDatabase,
}) {
  return (
    <>
      <div className='flex justify-between items-center mx-2 mt-4'>
        <h1 className='text-red-500 p-2 border border-red-200 shadow rounded-md mx-auto '>
          Your Favorite Pokemon
        </h1>
        <Link to='/' className='border border-gray-200 p-2 shadow rounded-md'>
          Back
        </Link>
      </div>
      <FavoriteDisplay
        pokemonName={pokemonName}
        setPokemonName={setPokemonName}
        pokemonDetail={pokemonDetail}
        setPokemonDetail={setPokemonDetail}
        database={database}
        setDatabase={setDatabase}
      />
    </>
  );
}

export default Favorites;
