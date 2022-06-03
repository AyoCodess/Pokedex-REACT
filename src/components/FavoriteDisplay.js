import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonDetails from './PokemonDetails';

function FavoriteDisplay({
  pokemonName,
  setPokemonName,
  pokemonDetail,
  database,
  setDatabase,
}) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();

  // - local storage check

  const getDatabase = localStorage.getItem('database');
  const parsedDatabase = JSON.parse(getDatabase);

  useEffect(() => {
    if (parsedDatabase) {
      setDatabase(parsedDatabase);
    } else {
      return;
    }
  }, []);

  const displayDetails = (pokemon) => {
    setPokemonName(pokemon);
    setOpen(true);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (database) {
          let newList = database.map((pokemon) => {
            return `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
          });

          await Promise.all(newList.map((url) => axios(url))).then((data) => {
            setData(data);
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [database]);

  useEffect(() => {
    if (database) {
      // - updating local storage
      localStorage.setItem('database', JSON.stringify(database));
    }
  }, [database]);

  console.log({ database });

  return (
    <>
      <PokemonDetails
        open={open}
        setOpen={setOpen}
        pokemonName={pokemonName}
        pokemonDetail={pokemonDetail}
      />
      <div className='mt-4'>
        {database && (
          <ul className='flex flex-wrap gap-4 justify-center '>
            {database.map((pokemon, index) => {
              const id = +pokemon.url.split('/').splice(6, 1).join();
              return (
                <li
                  key={pokemon.name}
                  className='col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 w-96 mx-4'>
                  <div className='w-full flex items-center justify-between p-6 space-x-6'>
                    <div className='flex-1 truncate'>
                      <div className='flex items-center space-x-3'>
                        <h3 className='text-gray-900 text-sm font-medium truncate'>
                          {pokemon.name}
                        </h3>
                        <button
                          onClick={() => {
                            setDatabase((prev) => {
                              return prev.filter((pokemon) => {
                                return pokemon.name !== prev[index].name;
                              });
                            });
                          }}
                          className='flex-shrink-0 inline-block px-2 py-0.5 text-red-800 text-xs font-medium bg-red-100 rounded-full'>
                          delete
                        </button>
                      </div>

                      {data && data[index]?.data && (
                        <p className='mt-1 text-gray-500 text-sm truncate'>
                          <span>Weight:</span> {data[index].data.weight} lb
                        </p>
                      )}

                      {data && data[index]?.data && (
                        <p className='mt-1  text-sm truncate'>
                          Types:&nbsp;
                          {data[index].data.types.map((t) => {
                            return (
                              <span key={t.type.name}>{`${t.type.name} `}</span>
                            );
                          })}
                        </p>
                      )}
                    </div>
                    <img
                      onClick={() => {
                        displayDetails(pokemon);
                      }}
                      className='w-18 h-18 bg-gray-300 rounded-full flex-shrink-0'
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                      alt={pokemon.name}
                    />
                  </div>
                  <div>
                    <div className='-mt-px flex divide-x divide-gray-200'></div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export default FavoriteDisplay;
