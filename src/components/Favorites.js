import React from 'react';
import { Link } from 'react-router-dom';

function Favorites() {
  return (
    <>
      <h1>Favorite Pokemon</h1>
      <div>
        <Link to='/' className='border border-gray-200 p-2 shadow rounded-md'>
          Back
        </Link>
      </div>
    </>
  );
}

export default Favorites;
