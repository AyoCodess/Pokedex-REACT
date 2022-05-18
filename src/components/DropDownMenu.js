import React from 'react';

function DropDownMenu({ options, setEvent, perPage }) {
  console.log({ perPage });
  return (
    <div>
      <label htmlFor='page' className='block text-sm font-medium text-gray-700'>
        No. Pokemon
      </label>
      <select
        onChange={(e) => {
          setEvent(+e.target.value);
        }}
        name='page'
        className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md'
        value={perPage}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDownMenu;
