/* This VsContainer {data}requires Tailwind CSS v2.0+ */

export default function VsContainer({ data }) {
  return (
    <div className='bg-white'>
      <div className='max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24'>
        <div className='space-y-8 sm:space-y-12'>
          <ul className='mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6'>
            {data.map((pokemon, i) => {
              console.log(pokemon.data);
              //   console.log(pokemon.data.sprites.front_default);
              return (
                <li key={i}>
                  <div className='space-y-4'>
                    <img
                      className='mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24'
                      src={pokemon.data.sprites.front_default}
                      alt=''
                    />
                    <button
                      //   onClick={() =>
                      //     setSavedPokemon((prev) => {
                      //       if (prev.includes(pokemon)) {
                      //         console.log('pokemon already saved');
                      //         return prev;
                      //       } else {
                      //         return prev.concat(pokemon);
                      //       }
                      //     })
                      //   }
                      className='flex-shrink-0 inline-block px-2 py-0.5 text-red-800 text-xs font-medium bg-red-100 rounded-full'>
                      remove
                    </button>
                    <div className='space-y-2'>
                      <div className=' font-medium'>
                        <h2 className='text-xl'>{pokemon.data.name}</h2>
                        <p>
                          ID:{' '}
                          <span className='text-indigo-600'>
                            {pokemon.data.id}
                          </span>
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
                            {pokemon.data.weight}
                          </span>
                        </p>
                        <p>
                          Type:{' '}
                          <span className='text-indigo-600'>
                            {pokemon.data.types.map((type) => {
                              return <span>{`${type.type.name} `}</span>;
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
                            {pokemon.data.abilities.map((ability) => {
                              return <span>{`${ability.ability.name} `}</span>;
                            })}
                          </span>
                        </p>

                        <hr className='mt-2' />
                        <p className='mt-2'>
                          <span className='font-bold text-red-500'>
                            Base stats:
                          </span>{' '}
                          <span className='text-indigo-600'>
                            {pokemon.data.stats.map((stat) => {
                              console.log(stat.stat.name);
                              return (
                                <p className='block'>
                                  <span className='text-black'>
                                    {`${stat.stat.name}:`}{' '}
                                  </span>
                                  {`${stat.base_stat} `}
                                </p>
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
      </div>
    </div>
  );
}
