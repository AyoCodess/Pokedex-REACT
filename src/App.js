import './App.scss';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PaginatedItems from './components/PaginatedItems';
import Header from './components/Header';
import Footer from './components/Footer';
import Favorites from './components/Favorites';
import axios from 'axios';
import PokemonDetails from './components/PokemonDetails';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [items, setItems] = useState(null);
  const [defaultPokemonList, setDefaultPokemonList] = useState(null);
  const [savedPokemon, setSavedPokemon] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [pokemonName, setPokemonName] = useState({});
  const [currentItems, setCurrentItems] = useState(null);
  const [open, setOpen] = useState(false);

  console.log({ savedPokemon });

  const savedPokemonHandler = () => {
    console.log('yes');
  };

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

  return (
    <>
      {/* <PokemonDetails
        open={open}
        setOpen={setOpen}
        pokemonName={pokemonName}
        pokemonDetail={pokemonDetail}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
      /> */}
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <PaginatedItems
              currentItems={currentItems}
              setCurrentItems={setCurrentItems}
              itemsPerPage={6}
              items={items}
              error={error}
              setError={setError}
              loading={loading}
              setLoading={setLoading}
              setItems={setItems}
              setPokemonName={setPokemonName}
              defaultPokemonList={defaultPokemonList}
              setSavedPokemon={setSavedPokemon}
              savedPokemonHandler={savedPokemonHandler}
              open={open}
              setOpen={setOpen}
            />
          }
        />
        <Route
          path='/favorites'
          element={
            <Favorites
              currentItems={currentItems}
              savedPokemon={savedPokemon}
              loading={loading}
              setLoading={setLoading}
              error={error}
              setError={setError}
              pokemonDetail={pokemonDetail}
              setPokemonDetail={setPokemonDetail}
              pokemonName={pokemonName}
              setPokemonName={setPokemonName}
              setSavedPokemon={setSavedPokemon}
              savedPokemonHandler={savedPokemonHandler}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
