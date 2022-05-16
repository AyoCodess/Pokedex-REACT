import React, { useState } from 'react';
import { MailIcon, PhoneIcon } from '@heroicons/react/solid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PokemonDetails from './PokemonDetails';

export default function ListDisplay({
  currentItems,
  loading,
  setLoading,
  error,
  setError,
}) {
  const [open, setOpen] = useState(false);
  const [pokemonName, setPokemonName] = useState({});

  const displayDetails = (pokemon) => {
    setPokemonName(pokemon);
    setOpen(true);
  };
  return (
    <>
      <PokemonDetails
        open={open}
        setOpen={setOpen}
        pokemonName={pokemonName}
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
                      {/* <span className='flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full'>
                    {person.role}
                  </span> */}
                    </div>
                    {/* <p className='mt-1 text-gray-500 text-sm truncate'>
                  {person.title}
                </p> */}
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
