import React, { useState } from 'react';
import BasicBtn from './BasicBtn';
import BasicInputField from './BasicInputField';
import DropDownMenu from './DropDownMenu';

export default function SearchField({
  items,
  setItems,
  defaultPokemonList,
  filterOptions,
  setFilterOptions,
  listOfGenerations,
  setPageReset,
  setPokemonPerPage,
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
    setPageReset(0);
    setPokemonPerPage(6);
    setItems(defaultPokemonList);

    if (listOfGenerations) {
      setFilterOptions(false);
    }
  };
  return (
    <div className='mt-4 w-full'>
      <div className='flex gap-2 justify-center mt-4'>
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
        <BasicBtn onClick={handleSearch} title={'Search'} custom={'mt-auto'} />
      </div>

      <div className='flex gap-2 justify-center mt-4 bg-red-50 p-2 '>
        <BasicBtn onClick={handleReset} title={'Reset'} />
        <BasicBtn
          onClick={() => {
            filterOptions ? setFilterOptions(false) : setFilterOptions(true);
          }}
          title={' Filter Options'}
        />
        <DropDownMenu
          options={[6, 15, 25, 50, 100]}
          setEvent={setPokemonPerPage}
        />
      </div>
    </div>
  );
}
