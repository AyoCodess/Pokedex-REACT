import axios from 'axios';
import React, { useState } from 'react';

function FilterOptionsList({
  defaultPokemonList,
  setItems,
  items,
  listOfGenerations,
  setListOfGenerations,
}) {
  const [filterGenerationBtn, setFilterGenerationBtn] = useState(false);
  const [generationNumber, setGenerationNumber] = useState('All Pokemon');

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
      <div className='flex gap-2 justify-between items-center'>
        <button
          onClick={() => {
            filterByGenerationList();
          }}
          className='p-2 border border-red-100  shadow rounded-md hover:bg-red-100'>
          Filter By Generation
        </button>
        <p className='border border-red-500 p-2 shadow rounded-md text-center'>
          {generationNumber}
        </p>
      </div>

      {listOfGenerations && filterGenerationBtn && (
        <ul className='flex gap-2 flex-col mt-3 text-center'>
          {listOfGenerations.map((generation, i) => {
            return (
              <li
                className='p-1 border-gray-200 border shadow rounded-md hover:bg-red-200  '
                key={generation.name}
                onClick={(e) => {
                  setFilterGenerationBtn(false);
                  filterPokemonByGeneration(i + 1);
                  setGenerationNumber(generation.name);
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
