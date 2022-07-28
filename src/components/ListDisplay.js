import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PokemonDetails from './PokemonDetails';
import axios from 'axios';

function ListDisplay({
  currentItems,
  loading,
  setLoading,
  error,
  setError,
  pokemonName,
  setPokemonName,
  pokemonDetail,
  setDatabase,
}) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const displayDetails = (pokemon) => {
    setPokemonName(pokemon);
    setOpen(true);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (currentItems) {
          let newList = currentItems.map((pokemon) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItems]);

  return (
    <>
      <PokemonDetails
        open={open}
        setOpen={setOpen}
        pokemonName={pokemonName}
        pokemonDetail={pokemonDetail}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
      />
      {currentItems && (
        <ul className='mt-4 flex flex-wrap gap-4 justify-center'>
          {currentItems.map((pokemon, index) => {
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
                        onClick={() =>
                          setDatabase((prev) => {
                            if (prev.includes(pokemon)) {
                              console.log('pokemon already saved');
                              return prev;
                            } else {
                              // - updating local storage
                              localStorage.setItem(
                                'database',
                                JSON.stringify(prev.concat(pokemon))
                              );
                              return prev.concat(pokemon);
                            }
                          })
                        }
                        className='flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full'>
                        save
                      </button>
                    </div>

                    <div>
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
                  </div>
                  <LazyLoadImage
                    onClick={() => displayDetails(pokemon)}
                    className='w-18 h-18 bg-gray-300 rounded-full flex-shrink-0 cursor-pointer'
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
    </>
  );
}

export default ListDisplay;
