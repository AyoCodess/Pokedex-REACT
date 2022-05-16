import React, { useState } from 'react';

export default function SearchField({
  items,
  setItems,
  filteredList,
  setFilteredList,
  defaultPokemonList,
  filterOptions,
  setFilterOptions,
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
    <div className='mt-4 w-full'>
      <label
        htmlFor='pokemon'
        className='block w-2/3 mx-auto text-sm text-center font-medium text-gray-700'>
        Search Pokemon
      </label>
      <div className='flex flex-col sm:flex-row mt-2 gap-2 mx-auto justify-center items-center  '>
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
        <div className='flex gap-2 '>
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
          <button
            type='button'
            onClick={() => {
              filterOptions ? setFilterOptions(false) : setFilterOptions(true);
            }}
            className='w-max border-gray-200 p-2 rounded-md shadow'>
            Filter Options
          </button>
        </div>
      </div>
    </div>
  );
}
