import './App.scss';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PaginatedItems from './components/PaginatedItems';
import Header from './components/Header';
import Footer from './components/Footer';
import Favorites from './components/Favorites';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [items, setItems] = useState(null);
  const [defaultPokemonList, setDefaultPokemonList] = useState(null);

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
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <PaginatedItems
              itemsPerPage={6}
              items={items}
              error={error}
              setError={setError}
              loading={loading}
              setLoading={setLoading}
              setItems={setItems}
              defaultPokemonList={defaultPokemonList}
            />
          }
        />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
