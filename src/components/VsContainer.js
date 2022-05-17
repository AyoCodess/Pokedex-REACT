/* This VsContainer {data}requires Tailwind CSS v2.0+ */

export default function VsContainer({ data }) {
  return (
    <div className='bg-white'>
      <div className='max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24'>
        <div className='space-y-8 sm:space-y-12'>
          <ul className='mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6'>
            {data.map((pokemon, i) => {
              console.log(pokemon.data.sprites.front_default);
              return (
                <li key={i}>
                  <div className='space-y-4'>
                    <img
                      className='mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24'
                      src={pokemon.data.sprites.front_default}
                      alt=''
                    />
                    <div className='space-y-2'>
                      <div className='text-xs font-medium lg:text-sm'>
                        <h3>{pokemon.data.name}</h3>
                        {/* <p className='text-indigo-600'>{person.role}</p> */}
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
