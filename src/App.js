import './App.scss';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Favorites from './Pages/Favorites';
import Vs from './Pages/Vs';
import axios from 'axios';
import Toast from './components/Toast';

function App() {
  // - data fetching states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //, fetching initial list of pokemon
  const [items, setItems] = useState(null);

  // - after data is fetched, this state saves that original list as state to be used to reset the app with
  // - without having to fetch that data again
  const [defaultPokemonList, setDefaultPokemonList] = useState(null);

  // - when we fetch to find a pokemon, we use this state to get the details of that pokemon
  const [pokemonName, setPokemonName] = useState({});

  // - searchfield validation
  const [noPokemonFound, setNoPokemonFound] = useState(false);

  // - stores selected pokemon information
  const [pokemonDetail, setPokemonDetail] = useState(null);

  // - sets the amount of pokemon per page
  const [pokemonPerPage, setPokemonPerPage] = useState(6);

  // - saved added pokemon, VS page
  const [savedList, setSavedList] = useState([]);

  // - fetches pokemon data for VS page, for now we make an independent fetch request
  const [vsData, setVsData] = useState([]);

  // - used to store saved pokemon data into favorites
  const [database, setDatabase] = useState([]);

  // - fetch pokemon data and resets the app to its initial state and renders a saved list of pokemon
  const [hasPageReset, setHasPageReset] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      // - the amount of pokemon in existence
      let PokemonCount = 898;
      if (!defaultPokemonList) {
        setLoading(true);
      }
      try {
        if (!defaultPokemonList) {
          const response = await axios(
            `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${PokemonCount}`
          );

          setItems(response.data.results);
          setDefaultPokemonList(response.data.results);

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
    const fetchDetails = async () => {
      if (!defaultPokemonList) return; // - prevents axios returning get request returning undefined on app mount
      try {
        if (pokemonName) {
          const response = await axios(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName.name}`
          );

          setPokemonDetail(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetails();
  }, [pokemonName]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (savedList) {
          let response = savedList.map((pokemon) => {
            return `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
          });

          await Promise.all(response.map((url) => axios(url))).then((data) => {
            setVsData(data);
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [savedList]);

  // - removes search field error toast
  useEffect(() => {
    if (noPokemonFound || hasPageReset) {
      setTimeout(() => {
        setNoPokemonFound(false);
        setHasPageReset(false);
      }, 5000);
    }
  }, [noPokemonFound, hasPageReset]);

  return (
    <div className='flex flex-col h-screen '>
      <Header />
      <Toast
        show={noPokemonFound}
        setShow={setNoPokemonFound}
        title={'No Pokemon Found'}
        description={'Please try again'}
      />
      <Toast
        show={hasPageReset}
        setShow={setHasPageReset}
        title={'Page has already been reset'}
        description={'Please search for pokemon or navigate to page 1'}
      />
      <main>
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
                noPokemonFound={noPokemonFound}
                setNoPokemonFound={setNoPokemonFound}
                hasPageReset={hasPageReset}
                setHasPageReset={setHasPageReset}
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
                noFoundPokemon={noPokemonFound}
                setNoFoundPokemon={setNoPokemonFound}
              />
            }
          />
        </Routes>
      </main>

      <footer className='mt-auto'>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
