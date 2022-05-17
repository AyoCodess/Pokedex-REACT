import axios from 'axios';
import React, { useState, useEffect } from 'react';

function FilterOptionsList({
  defaultPokemonList,
  setItems,
  items,
  listOfGenerations,
  setListOfGenerations,
}) {
  const [filterGenerationBtn, setFilterGenerationBtn] = useState(false);

  const filterByGenerationList = async () => {
    filterGenerationBtn
      ? setFilterGenerationBtn(false)
      : setFilterGenerationBtn(true);

    if (!listOfGenerations) {
      try {
        const data = await axios(`https://pokeapi.co/api/v2/generation/`);

        setListOfGenerations(data.data.results);
      } catch (err) {
        console.log(err);
      }
    } else {
      return listOfGenerations;
    }
  };

  const filterPokemonByGeneration = async (generation) => {
    setItems(defaultPokemonList);
    try {
      const data = await axios(
        `https://pokeapi.co/api/v2/generation/${generation}`
      );

      setItems(data.data.pokemon_species);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex flex-col justify-center mt-4 w-2/3 mx-auto sm:w-96  '>
      <button
        onClick={() => {
          filterByGenerationList();
        }}
        className='p-2 border border-red-100  shadow rounded-md hover:bg-red-100'>
        Filter By Generation
      </button>

      {listOfGenerations && filterGenerationBtn && (
        <ul className='flex gap-2 flex-col mt-3 text-center'>
          {listOfGenerations.map((generation, i) => {
            return (
              <li
                className='p-1 border-gray-200 border shadow rounded-md hover:bg-red-200 '
                key={generation.name}
                onClick={(e) => {
                  setFilterGenerationBtn(false);
                  filterPokemonByGeneration(i + 1);
                }}>
                {generation.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default FilterOptionsList;
