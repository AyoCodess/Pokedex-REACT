import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='flex flex-col p-2'>
      <h1 className='text-center text-lg text-red-500 font-bold'>
        Poke<span className='font-black text-black'>DEX</span>
      </h1>
      <div className='flex justify-center mt-3 gap-4'>
        <Link
          to='/favorites'
          className='border-2 border-gray-200 shadow rounded-md p-2 '>
          Favorites
        </Link>
        <Link
          to='/Vs'
          className='border-2 border-gray-200 shadow rounded-md p-2 '>
          Vs
        </Link>
      </div>
    </div>
  );
}

export default Header;
