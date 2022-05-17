import React from 'react';

function BasicInputField({
  labelTitle,
  inputName,
  placeholder,
  onChange,
  custom,
  hideLabel,
}) {
  return (
    <div className={`${custom}`}>
      {!hideLabel && (
        <label
          htmlFor='pokemon'
          className='block w-2/3 mx-auto text-sm text-center font-medium text-gray-700'>
          {labelTitle}
        </label>
      )}
      <div className='flex flex-col sm:flex-row mt-2 gap-2 mx-auto justify-center items-center  '>
        <div className='mt-1'>
          <input
            type='text'
            name={inputName}
            id='pokemon'
            className='shadow-sm w-full mx-auto p-2 focus:ring-red-500 focus:border-red-500 block sm:text-sm border border-gray-300 rounded-md'
            placeholder={placeholder}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

export default BasicInputField;
