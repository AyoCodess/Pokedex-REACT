import React from 'react';

function VsContainer({ data, setSavedList }) {
  return (
    <div className='py-12'>
      <ul className='flex flex-wrap justify-center gap-4  '>
        {data.map((pokemon, i) => {
          return (
            <li
              key={pokemon.data.name}
              className='border-gray-200 border shadow rounded-md p-4 '>
              <div className='space-y-4'>
                <div className='flex w-max '>
                  <img
                    className='mx-auto h-max w-max rounded-full  '
                    src={pokemon.data.sprites.front_default}
                    alt=''
                  />
                  <img
                    className='mx-auto h-max w-max rounded-full '
                    src={pokemon.data.sprites.back_default}
                    alt=''
                  />
                </div>
                <button
                  onClick={() =>
                    setSavedList((prev) => {
                      return prev.filter((pokemon) => {
                        return pokemon.name !== prev[i].name;
                      });
                    })
                  }
                  className='flex-shrink-0 inline-block px-2 py-0.5 text-red-800 text-xs font-medium bg-red-100 rounded-full'>
                  remove
                </button>
                <div className='space-y-2'>
                  <div className=' font-medium'>
                    <h2 className='text-xl'>{pokemon.data.name}</h2>
                    <p>
                      ID:{' '}
                      <span className='text-indigo-600'>{pokemon.data.id}</span>
                    </p>
                    <p>
                      Height:{' '}
                      <span className='text-indigo-600'>
                        {pokemon.data.height}
                      </span>
                    </p>
                    <p>
                      Weight:{' '}
                      <span className='text-indigo-600'>
                        {pokemon.data.weight} lb
                      </span>
                    </p>
                    <p>
                      Type:{' '}
                      <span className='text-indigo-600'>
                        {pokemon.data.types.map((type, i) => {
                          return <span key={i}>{`${type.type.name} `}</span>;
                        })}
                      </span>
                    </p>
                    <p>
                      Base Experience::{' '}
                      <span className='text-indigo-600'>
                        {pokemon.data.base_experience}
                      </span>
                    </p>
                    <p>
                      Abilities:{' '}
                      <span className='text-indigo-600'>
                        {pokemon.data.abilities.map((ability, i) => {
                          return (
                            <span key={i}>{`${ability.ability.name} `}</span>
                          );
                        })}
                      </span>
                    </p>

                    <hr className='mt-2' />
                    <p className='mt-2'>
                      <span className='font-bold text-red-500'>
                        Base stats:
                      </span>{' '}
                      <span className='text-indigo-600'>
                        {pokemon.data.stats.map((stat, i) => {
                          return (
                            <div key={i} className='block'>
                              <span className='text-black'>
                                {`${stat.stat.name}:`}{' '}
                              </span>
                              {`${stat.base_stat} `}
                            </div>
                          );
                        })}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default VsContainer;
