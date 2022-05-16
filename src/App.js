import './App.css';
import React, { useState, useEffect } from 'react';
import ListDisplay from './components/ListDisplay';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [error, setError] = useState(false);
  // - PokemonList.js
  // - the amount of pokemon in existence
  let PokemonCount = 898;

  const [pokemonList, setPokemonList] = useState({});

  const fetchPokemon = async () => {
    try {
      const data = await axios(
        `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${PokemonCount}`
      );

      setPokemonList(data.data);
      setError(false);
      console.log(data.data);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <>
      <Header />
      {!error && <ListDisplay pokemonList={pokemonList} />}
      {error && (
        <h2 className='text-blue-500 w-2/3 mx-auto text-center p-2 shadow border-gray-200 rounded-md'>
          Failed to fetch pokemon data, please try again.
        </h2>
      )}
      <Footer />
    </>
  );
}

export default App;
