import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonDetails from './PokemonDetails';

function FavoriteDisplay({
  savedPokemon,
  setSavedPokemon,
  pokemonName,
  setPokemonName,
  pokemonDetail,
  setPokemonDetail,
}) {
  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState();
  const [type, setType] = useState();
  const [data, setData] = useState();

  const displayDetails = (pokemon) => {
    setPokemonName(pokemon);
    setOpen(true);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (savedPokemon) {
          let newList = savedPokemon.map((pokemon, i) => {
            return `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
          });

          const results = await Promise.all(
            newList.map((url) => {
              return axios(url);
            })
          ).then((data) => {
            setData(data);
          });

          //   const pokemon1 = await axios(
          //     `https://pokeapi.co/api/v2/pokemon/${savedPokemon[0].name}`
          //   );
          //   const pokemon2 = await axios(
          //     `https://pokeapi.co/api/v2/pokemon/${savedPokemon[1].name}`
          //   );
          //   const pokemon3 = await axios(
          //     `https://pokeapi.co/api/v2/pokemon/${savedPokemon[2].name}`
          //   );
          //   const pokemon4 = await axios(
          //     `https://pokeapi.co/api/v2/pokemon/${savedPokemon[3].name}`
          //   );
          //   const pokemon5 = await axios(
          //     `https://pokeapi.co/api/v2/pokemon/${savedPokemon[4].name}`
          //   );
          //   const pokemon6 = await axios(
          //     `https://pokeapi.co/api/v2/pokemon/${savedPokemon[5].name}`
          //   );

          //   setWeight([
          //     pokemon1.data.weight,
          //     pokemon2.data.weight,
          //     pokemon3.data.weight,
          //     pokemon4.data.weight,
          //     pokemon5.data.weight,
          //     pokemon6.data.weight,
          //   ]);

          //   setType([
          //     pokemon1.data.types,
          //     pokemon2.data.types,
          //     pokemon3.data.types,
          //     pokemon4.data.types,
          //     pokemon5.data.types,
          //     pokemon6.data.types,
          //   ]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [savedPokemon]);

  //   console.log({ weight });
  //   console.log({ type });

  return (
    <>
      <PokemonDetails
        open={open}
        setOpen={setOpen}
        pokemonName={pokemonName}
        pokemonDetail={pokemonDetail}
      />
      <div>
        {savedPokemon && (
          <ul className='mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {savedPokemon.map((pokemon, index) => {
              if (data) {
                console.log(data[index].data.types);
              }
              const id = +pokemon.url.split('/').splice(6, 1).join();

              return (
                <li
                  key={index + 1}
                  className='col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200'>
                  <div className='w-full flex items-center justify-between p-6 space-x-6'>
                    <div className='flex-1 truncate'>
                      <div className='flex items-center space-x-3'>
                        <h3 className='text-gray-900 text-sm font-medium truncate'>
                          {pokemon.name}
                        </h3>
                        <button
                          onClick={() =>
                            setSavedPokemon((prev) => {
                              return prev.concat(pokemon);
                            })
                          }
                          className='flex-shrink-0 inline-block px-2 py-0.5 text-red-800 text-xs font-medium bg-red-100 rounded-full'>
                          delete
                        </button>
                      </div>

                      {data && (
                        <p className='mt-1 text-gray-500 text-sm truncate'>
                          <span>Weight:</span> {data[index].data.weight} lb
                        </p>
                      )}

                      {data && (
                        <p className='mt-1  text-sm truncate'>
                          Types:
                          {data[index].data.types.map((t, i) => {
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
                    <div className='-mt-px flex divide-x divide-gray-200'>
                      {/* <div className='w-0 flex-1 flex'>
                  <a
                    href={`mailto:${person.email}`}
                    className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500'>
                    <MailIcon
                      className='w-5 h-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <span className='ml-3'>Email</span>
                  </a>
                </div> */}
                      {/* <div className='-ml-px w-0 flex-1 flex'>
                  <a
                    href={`tel:${person.telephone}`}
                    className='relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500'>
                    <PhoneIcon
                      className='w-5 h-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <span className='ml-3'>Call</span>
                  </a>
                </div> */}
                    </div>
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
