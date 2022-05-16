import './App.css';
import React, { useState, useEffect } from 'react';
import ListDisplay from './components/ListDisplay';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  // - PokemonList.js
  // - the amount of pokemon in existence
  let PokemonCount = 898;

  const [pokemonList, setPokemonList] = useState({});

  const fetchPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${PokemonCount}`
      );

      const data = await response.json();

      setPokemonList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <>
      <Header />
      <ListDisplay pokemonList={pokemonList} />
      <Footer />
    </>
  );
}

export default App;
