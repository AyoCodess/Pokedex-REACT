import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BasicBtn from '../components/BasicBtn';
import BasicInputField from '../components/BasicInputField';
import VsContainer from '../components/VsContainer';
import axios from 'axios';

function Vs({ defaultPokemonList }) {
  const [searchedForPokemon, setSearchedForPokemon] = useState([]);
  const [savedList, setSavedList] = useState([]);
  const [data, setData] = useState([]);

  const handleSearch = (pokemonName) => {
    defaultPokemonList.filter((pokemon) => {
      if (pokemonName === pokemon.name) {
        return setSavedList((prev) => [pokemon, ...prev]);
      } else {
        console.log('Pokemon does not exist');
        return savedList;
      }
    });
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (savedList) {
          let data = savedList.map((pokemon) => {
            return `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
          });

          await Promise.all(data.map((url) => axios(url))).then((data) => {
            setData(data);
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [savedList]);

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
      <div className='flex mx-auto justify-center w-2/3 '>
        <BasicInputField
          labelTitle={'Search Pokemon and compare!'}
          inputName={'vs'}
          placeholder={'Pikachu'}
          hideLabel={true}
          onChange={(e) => {
            setSearchedForPokemon(e.target.value);
          }}
        />
        <BasicBtn
          title={'Add'}
          onClick={() => handleSearch(searchedForPokemon)}
          custom={'h-10 mt-auto'}
        />
      </div>
      {data.length >= 1 && <VsContainer data={data} />}
    </>
  );
}

export default Vs;
