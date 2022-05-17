import React, { useState, useEffect } from 'react';
import { MailIcon, PhoneIcon } from '@heroicons/react/solid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PokemonDetails from './PokemonDetails';
import axios from 'axios';

export default function ListDisplay({
  currentItems,
  loading,
  setLoading,
  error,
  setError,
  pokemonName,
  setPokemonName,
  pokemonDetail,
  setPokemonDetail,
}) {
  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState();
  const [type, setType] = useState();

  const displayDetails = (pokemon) => {
    setPokemonName(pokemon);
    setOpen(true);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (currentItems) {
          const pokemon1 = await axios(
            `https://pokeapi.co/api/v2/pokemon/${currentItems[0].name}`
          );
          const pokemon2 = await axios(
            `https://pokeapi.co/api/v2/pokemon/${currentItems[1].name}`
          );
          const pokemon3 = await axios(
            `https://pokeapi.co/api/v2/pokemon/${currentItems[2].name}`
          );
          const pokemon4 = await axios(
            `https://pokeapi.co/api/v2/pokemon/${currentItems[3].name}`
          );
          const pokemon5 = await axios(
            `https://pokeapi.co/api/v2/pokemon/${currentItems[4].name}`
          );
          const pokemon6 = await axios(
            `https://pokeapi.co/api/v2/pokemon/${currentItems[5].name}`
          );

          setWeight([
            pokemon1.data.weight,
            pokemon2.data.weight,
            pokemon3.data.weight,
            pokemon4.data.weight,
            pokemon5.data.weight,
            pokemon6.data.weight,
          ]);

          setType([
            pokemon1.data.types,
            pokemon2.data.types,
            pokemon3.data.types,
            pokemon4.data.types,
            pokemon5.data.types,
            pokemon6.data.types,
          ]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
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
        <ul className='mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {currentItems.map((pokemon, index) => {
            const id = +pokemon.url.split('/').splice(6, 1).join();

            return (
              <li
                onClick={() => displayDetails(pokemon)}
                key={index + 1}
                className='col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200'>
                <div className='w-full flex items-center justify-between p-6 space-x-6'>
                  <div className='flex-1 truncate'>
                    <div className='flex items-center space-x-3'>
                      <h3 className='text-gray-900 text-sm font-medium truncate'>
                        {pokemon.name}
                      </h3>
                      <button className='flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full'>
                        save
                      </button>
                    </div>

                    {weight && (
                      <p className='mt-1 text-gray-500 text-sm truncate'>
                        <span>Weight:</span> {weight[index]} lb
                      </p>
                    )}

                    {type && (
                      <p className='mt-1  text-sm truncate'>
                        Types:{' '}
                        {type[index].map((t, i) => {
                          return (
                            <span key={t.type.name}>{`${t.type.name} `}</span>
                          );
                        })}
                      </p>
                    )}
                  </div>
                  <LazyLoadImage
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
    </>
  );
}
