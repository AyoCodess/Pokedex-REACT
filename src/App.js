import './App.scss';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
  const [pokemonName, setPokemonName] = useState({});
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [pokemonPerPage, setPokemonPerPage] = useState(6);

  const [savedList, setSavedList] = useState([]);
  const [vsData, setVsData] = useState([]);

  const [database, setDatabase] = useState([]);

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
  }, [defaultPokemonList]);

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

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (savedList) {
          let data = savedList.map((pokemon) => {
            return `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
          });

          await Promise.all(data.map((url) => axios(url))).then((data) => {
            setVsData(data);
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [savedList]);

  return (
    <div className='flex flex-col h-screen '>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              pokemonPerPage={pokemonPerPage}
              setPokemonPerPage={setPokemonPerPage}
              items={items}
              error={error}
              setError={setError}
              loading={loading}
              setLoading={setLoading}
              setItems={setItems}
              defaultPokemonList={defaultPokemonList}
              pokemonName={pokemonName}
              setPokemonName={setPokemonName}
              pokemonDetail={pokemonDetail}
              setPokemonDetail={setPokemonDetail}
              setDatabase={setDatabase}
            />
          }
        />
        <Route
          path='/favorites'
          element={
            <Favorites
              pokemonName={pokemonName}
              setPokemonName={setPokemonName}
              pokemonDetail={pokemonDetail}
              setPokemonDetail={setPokemonDetail}
              database={database}
              setDatabase={setDatabase}
            />
          }
        />
        <Route
          path='/vs'
          element={
            <Vs
              defaultPokemonList={defaultPokemonList}
              savedList={savedList}
              setSavedList={setSavedList}
              vsData={vsData}
              setVsData={setVsData}
            />
          }
        />
      </Routes>

      <div className='mt-auto'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
