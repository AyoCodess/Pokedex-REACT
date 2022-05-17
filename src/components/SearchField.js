import React, { useState } from 'react';
import BasicBtn from './BasicBtn';
import BasicInputField from './BasicInputField';

export default function SearchField({
  items,
  setItems,
  filteredList,
  setFilteredList,
  defaultPokemonList,
  filterOptions,
  setFilterOptions,
  generation,
  listOfGenerations,
  setListOfGenerations,
  setPageReset,
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
      setPageReset(0);
    }

    if (listOfGenerations) {
      setItems(defaultPokemonList);
      setFilterOptions(false);
      setPageReset(0);
    }
  };
  return (
    <div className='mt-4 w-full'>
      <BasicInputField
        labelTitle={'Search Pokemon'}
        inputName={'pokemon'}
        placeholder={'Charizard'}
        onChange={(e) => {
          setSearchedForPokemon(e.target.value);
          if (searchedForPokemon) {
            setItems(defaultPokemonList);
          }
        }}
      />

      <div className='flex gap-2 justify-center mt-4 '>
        <BasicBtn onClick={handleSearch} title={'Search'} />
        <BasicBtn onClick={handleReset} title={'Reset'} />
        <BasicBtn
          onClick={() => {
            filterOptions ? setFilterOptions(false) : setFilterOptions(true);
          }}
          title={' Filter Options'}
        />
      </div>
    </div>
  );
}
