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
  pageReset,
  setPageReset,
  setPokemonPerPage,
  pokemonPerPage,
  setNoPokemonFound,
  hasPageReset,
  setHasPageReset,
}) {
  const [searchedForPokemon, setSearchedForPokemon] = useState();

  const handleSearch = () => {
    // - triggers error toast if pokemon is not found
    let found = items.find((pokemon) => pokemon.name === searchedForPokemon);
    if (found) {
      setNoPokemonFound(false);
      return setItems([found]);
    } else {
      setNoPokemonFound(true);
      setSearchedForPokemon('');
      return items;
    }
  };
  console.log({ hasPageReset });
  const handleReset = () => {
    // - displays toast if page has already been reset
    if (pageReset === 0) {
      setHasPageReset(true);
    }

    setPageReset(0);
    setPokemonPerPage(6);
    setNoPokemonFound(false);
    setItems(defaultPokemonList);
    if (listOfGenerations) {
      setFilterOptions(false);
    }
  };
  return (
    <div className=' w-full '>
      <div className='flex gap-2 justify-center mt-4'>
        <BasicInputField
          labelTitle={'Search For a Pokemon'}
          inputName={'pokemon'}
          placeholder={'Charizard'}
          onChange={(e) => {
            setSearchedForPokemon(e.target.value.toLowerCase());
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
          perPage={pokemonPerPage}
        />
      </div>
    </div>
  );
}
