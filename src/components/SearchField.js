import React, { useState } from 'react';

export default function SearchField({
  items,
  setItems,
  filteredList,
  setFilteredList,
  defaultPokemonList,
}) {
  const [searchedForPokemon, setSearchedForPokemon] = useState();

  const handleSearch = () => {
    items.filter((pokemon) => {
      if (pokemon.name === searchedForPokemon) {
        return setItems([pokemon]);
      } else {
        return items;
      }
    });
  };

  const handleReset = () => {
    if (items.length === 1) {
      setItems(defaultPokemonList);
    }
  };
  return (
    <div className='mt-4'>
      <label
        htmlFor='pokemon'
        className='block w-2/3 mx-auto text-sm font-medium text-gray-700'>
        Search Pokemon
      </label>
      <div className='flex gap-2 mx-auto w-max'>
        <div className='mt-1'>
          <input
            type='text'
            name='pokemon'
            id='pokemon'
            className='shadow-sm w-full mx-auto p-2 focus:ring-red-500 focus:border-red-500 block sm:text-sm border-gray-300 rounded-md'
            placeholder='Charizard'
            onChange={(e) => {
              setSearchedForPokemon(e.target.value);
              if (searchedForPokemon) {
                setItems(defaultPokemonList);
              }
            }}
          />
        </div>
        <button
          type='button'
          onClick={handleSearch}
          className='w-max border-gray-200 p-2 rounded-md shadow'>
          Search
        </button>
        <button
          type='button'
          onClick={handleReset}
          className='w-max border-gray-200 p-2 rounded-md shadow'>
          Reset
        </button>
      </div>
    </div>
  );
}
