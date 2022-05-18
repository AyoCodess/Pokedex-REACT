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
      <div className='flex justify-between items-center mx-2'>
        <h1>Favorite Pokemon</h1>
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
