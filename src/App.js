import './App.scss';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Favorites from './Pages/Favorites';
import Vs from './Pages/Vs';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [items, setItems] = useState(null);
  const [defaultPokemonList, setDefaultPokemonList] = useState(null);
  const [savedPokemon, setSavedPokemon] = useState([]);
  const [pokemonName, setPokemonName] = useState({});
  const [pokemonDetail, setPokemonDetail] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      // - the amount of pokemon in existence
      let PokemonCount = 898;
      if (!defaultPokemonList) {
        setLoading(true);
      }
      try {
        if (!defaultPokemonList) {
          const data = await axios(
            `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${PokemonCount}`
          );

          setItems(data.data.results);
          setDefaultPokemonList(data.data.results);

          setError(false);
          setLoading(false);
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    // - the amount of pokemon in existence
    const fetchDetails = async () => {
      //   setLoading(true);
      try {
        if (pokemonName) {
          const data = await axios(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName.name}`
          );

          setPokemonDetail(data.data);
        }

        // setError(false);
        // setLoading(false);
      } catch (err) {
        // console.log(err);
        // setError(true);
        // setLoading(false);
      }
    };
    fetchDetails();
  }, [pokemonName]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              itemsPerPage={6}
              items={items}
              error={error}
              setError={setError}
              loading={loading}
              setLoading={setLoading}
              setItems={setItems}
              defaultPokemonList={defaultPokemonList}
              setSavedPokemon={setSavedPokemon}
              pokemonName={pokemonName}
              setPokemonName={setPokemonName}
              pokemonDetail={pokemonDetail}
              setPokemonDetail={setPokemonDetail}
            />
          }
        />
        <Route
          path='/favorites'
          element={
            <Favorites
              savedPokemon={savedPokemon}
              setSavedPokemon={setSavedPokemon}
              pokemonName={pokemonName}
              setPokemonName={setPokemonName}
              pokemonDetail={pokemonDetail}
              setPokemonDetail={setPokemonDetail}
            />
          }
        />
        <Route
          path='/vs'
          element={<Vs defaultPokemonList={defaultPokemonList} />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
