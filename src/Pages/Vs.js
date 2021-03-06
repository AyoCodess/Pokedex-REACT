import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BasicBtn from '../components/BasicBtn';
import BasicInputField from '../components/BasicInputField';
import VsContainer from '../components/VsContainer';

function Vs({
  defaultPokemonList,
  setSavedList,
  vsData,
  noFoundPokemon,
  setNoFoundPokemon,
}) {
  const [searchedForPokemon, setSearchedForPokemon] = useState([]);

  const handleSearch = (pokemonName) => {
    // - triggers error toast if pokemon is not found
    let found = defaultPokemonList.find(
      (pokemon) => pokemon.name === pokemonName
    );

    if (found === undefined) {
      setNoFoundPokemon(true);
    }
    if (found) {
      return setSavedList((prev) => {
        if (prev.includes(found)) {
          console.log('pokemon already saved'); // - could implement another toast for this branch
          return prev;
        } else {
          setNoFoundPokemon(false);
          return [found, ...prev];
        }
      });
    }
  };

  return (
    <>
      <div className='flex justify-end items-center mx-2'>
        <Link to='/' className='border border-gray-200 p-2 shadow rounded-md'>
          Back
        </Link>
      </div>
      <div className=' flex flex-col text-center mt-3 justify-center space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl p-2'>
        <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
          Let the battle begin!
        </h2>
        <p className='text-xl text-gray-500'>
          compare your favorite pokemon based on their base stats!
        </p>
      </div>
      <div className='flex mx-auto justify-center w-2/3 gap-2'>
        <BasicInputField
          labelTitle={'Search Pokemon and compare!'}
          inputName={'vs'}
          placeholder={'Pikachu'}
          hideLabel={true}
          onChange={(e) => {
            setSearchedForPokemon(e.target.value.toLowerCase());
          }}
        />
        <BasicBtn
          title={'Add'}
          onClick={() => handleSearch(searchedForPokemon)}
          custom={'h-10 mt-auto '}
        />
      </div>
      {vsData.length >= 1 && (
        <VsContainer data={vsData} setSavedList={setSavedList} />
      )}
    </>
  );
}

export default Vs;
