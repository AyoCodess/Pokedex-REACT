import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import ListDisplay from './ListDisplay';
import '../styles/pagination.scss';

export default function PaginatedItems({ itemsPerPage }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [items, setItems] = useState(null);

  useEffect(() => {
    // - the amount of pokemon in existence
    const fetchPokemon = async () => {
      let PokemonCount = 898;
      setLoading(true);
      try {
        const data = await axios(
          `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${PokemonCount}`
        );

        setItems(data.data.results);

        setError(false);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (items) {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }
    console.log({ items });
  }, [itemOffset, itemsPerPage, items]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  console.log(currentItems);

  return (
    <>
      {error && (
        <h2 className='text-blue-500 w-2/3 mx-auto text-center p-2 shadow border-gray-200 rounded-md'>
          Failed to fetch pokemon data, please try again.
        </h2>
      )}
      {loading && (
        <h2 className='text-blue-500 w-2/3 mx-auto text-center p-2 shadow border-gray-200 rounded-md'>
          Loading Pokemon
        </h2>
      )}
      {!loading && !error && (
        <>
          <ListDisplay currentItems={currentItems} />
          <ReactPaginate
            className=' pagination flex flex-wrap justify-center gap-2 p-2 border-2 w-[90%]  md:w-max rounded-md border-gray-200 mt-4 mx-auto text-sm md:text-lg
            '
            breakLabel='...'
            nextLabel='Next >'
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel='< Previous'
            renderOnZeroPageCount={null}
          />
        </>
      )}
    </>
  );
}
