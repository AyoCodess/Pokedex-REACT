import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import ListDisplay from '../components/ListDisplay';
import '../styles/pagination.scss';
import SearchField from '../components/SearchField';
import FilterOptionsList from '../components/FilterOptionsList';

export default function Home({
  pokemonPerPage,
  items,
  error,
  setError,
  loading,
  setLoading,
  setItems,
  defaultPokemonList,
  setSavedPokemon,
  pokemonName,
  setPokemonName,
  pokemonDetail,
  setPokemonDetail,
  setPokemonPerPage,
}) {
  const [filteredList, setFilteredList] = useState(null);
  const [filterOptions, setFilterOptions] = useState(false);
  const [listOfGenerations, setListOfGenerations] = useState();
  const [pageReset, setPageReset] = useState(null);

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (items) {
      if (items.length > 1) {
        // Fetch items from another resources.
        const endOffset = itemOffset + pokemonPerPage;
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / pokemonPerPage));
      }

      if (items.length === 1) {
        setCurrentItems(items);
        setPageCount(Math.ceil(items.length / pokemonPerPage));
      }
    }
  }, [itemOffset, pokemonPerPage, items]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * pokemonPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

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
          <SearchField
            items={items}
            setItems={setItems}
            filteredList={filteredList}
            setFilteredList={setFilteredList}
            defaultPokemonList={defaultPokemonList}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            listOfGenerations={listOfGenerations}
            setListOfGenerations={setListOfGenerations}
            setPageReset={setPageReset}
            setPokemonPerPage={setPokemonPerPage}
          />
          {filterOptions && (
            <FilterOptionsList
              defaultPokemonList={defaultPokemonList}
              setItems={setItems}
              items={items}
              listOfGenerations={listOfGenerations}
              setListOfGenerations={setListOfGenerations}
            />
          )}

          {!filteredList && (
            <>
              <ListDisplay
                currentItems={currentItems}
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
                pokemonDetail={pokemonDetail}
                setPokemonDetail={setPokemonDetail}
                pokemonName={pokemonName}
                setPokemonName={setPokemonName}
                setSavedPokemon={setSavedPokemon}
              />
              <ReactPaginate
                className=' pagination flex flex-wrap justify-center gap-3 p-3 border-2 mx-2 md:w-max rounded-md border-gray-200 mt-4 sm:mx-auto text-sm md:text-lg
            '
                breakLabel='...'
                nextLabel='Next >'
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel='< Previous'
                renderOnZeroPageCount={null}
                forcePage={pageReset}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
