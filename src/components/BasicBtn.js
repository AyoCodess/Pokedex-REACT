import React from 'react';

function BasicBtn({ onClick, title, custom }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`w-max border border-gray-300 p-2 rounded-md shadow ${custom}`}>
      {title}
    </button>
  );
}

export default BasicBtn;
