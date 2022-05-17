import React from 'react';
import { Link } from 'react-router-dom';
import ListDisplay from './ListDisplay';

function Favorites({
  savedPokemon,
  currentItems,
  loading,
  setLoading,
  error,
  setError,
  pokemonDetail,
  setPokemonDetail,
  pokemonName,
  setPokemonName,
  setSavedPokemon,
  savedPokemonHandler,
}) {
  return (
    <>
      <div className='flex justify-between items-center mx-2'>
        <h1>Favorite Pokemon</h1>
        <Link to='/' className='border border-gray-200 p-2 shadow rounded-md'>
          Back
        </Link>
      </div>
      {/* <ListDisplay
        currentItems={savedPokemon}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
        pokemonDetail={pokemonDetail}
        setPokemonDetail={setPokemonDetail}
        pokemonName={pokemonName}
        setPokemonName={setPokemonName}
        setSavedPokemon={setSavedPokemon}
        savedPokemonHandler={savedPokemonHandler}
      /> */}
    </>
  );
}

export default Favorites;
