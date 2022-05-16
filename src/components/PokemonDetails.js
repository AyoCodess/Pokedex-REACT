/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import axios from 'axios';

export default function PokemonDetails({
  open,
  setOpen,
  pokemonName,
  loading,
  setLoading,
  error,
  setError,
}) {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  useEffect(() => {
    // - the amount of pokemon in existence
    const fetchDetails = async () => {
      //   setLoading(true);
      try {
        console.log(pokemonName);
        if (pokemonName) {
          const data = await axios(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName.name}`
          );

          setPokemonDetail(data.data);
        }

        // setError(false);
        // setLoading(false);
      } catch (err) {
        console.log(err);
        // setError(true);
        // setLoading(false);
      }
    };
    fetchDetails();
  }, [pokemonName]);

  if (pokemonDetail) {
    console.log(pokemonDetail.moves[0].move.name);
  }
  return (
    <>
      {pokemonDetail && (
        <>
          <Transition.Root show={open} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={setOpen}>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
              </Transition.Child>

              <div className='fixed z-10 inset-0 overflow-y-auto'>
                <div className='flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    enterTo='opacity-100 translate-y-0 sm:scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                    leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                    <Dialog.Panel className='relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6'>
                      <div>
                        <div className='mx-auto flex items-center justify-center  h-36 w-36 rounded-full '>
                          <img
                            className='h-36 w-36'
                            aria-hidden='true'
                            src={pokemonDetail.sprites.front_default}
                            alt={pokemonName}
                          />
                        </div>

                        <div className='mt-3 text-center sm:mt-5'>
                          <Dialog.Title
                            as='h3'
                            className='text-lg leading-6 font-medium text-gray-900'>
                            {pokemonDetail.name}
                          </Dialog.Title>
                          <div className='mt-2 '>
                            <details className='text-gray-500  font-bold'>
                              <hr className='my-3' />
                              <p>
                                <span>Base Experience: </span>
                                {pokemonDetail.base_experience}
                              </p>
                              <div>
                                <hr className='my-3' />
                                <span>Moves: </span>
                                <p className='flex flex-col '>
                                  <span className='block'>
                                    {pokemonDetail.moves[0].move.name}
                                  </span>
                                  <span className='block'>
                                    {pokemonDetail.moves[1].move.name}
                                  </span>
                                  <span className='block'>
                                    {pokemonDetail.moves[2].move.name}
                                  </span>
                                  <span className='block'>
                                    {pokemonDetail.moves[3].move.name}
                                  </span>
                                </p>
                                <hr className='my-3' />
                              </div>
                            </details>
                          </div>
                        </div>
                      </div>
                      <div className='mt-5 sm:mt-6'>
                        <button
                          type='button'
                          className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm'
                          onClick={() => setOpen(false)}>
                          Back to List
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </>
      )}
    </>
  );
}
