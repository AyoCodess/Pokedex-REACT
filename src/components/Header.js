import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <h1 className='w-full text-center text-2xl text-red-500 font-bold bg-red-50 p-2'>
        Poke<span className='font-black text-black'>DEX</span>
      </h1>
      <div className='flex flex-col mt-4 '>
        <div className='flex justify-center mt-3 gap-4'>
          <Link
            to='/favorites'
            className='border-2 border-gray-200 shadow rounded-md p-2 '>
            Favorites
          </Link>
          <Link
            to='/Vs'
            className='border-2 border-gray-200 shadow rounded-md p-2 bg-red-400 text-white'>
            Vs
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
