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
  pokemonName,
  setPokemonName,
  pokemonDetail,
  setPokemonDetail,
  setPokemonPerPage,
  setDatabase,
  setNoPokemonFound,
  noPokemonFound,
  hasPageReset,
  setHasPageReset,
}) {
  // - filter option states
  const [filteredList] = useState(null);
  const [filterOptions, setFilterOptions] = useState(false);
  const [listOfGenerations, setListOfGenerations] = useState();

  // - called when user hits the reset button
  const [pageReset, setPageReset] = useState(null);

  // - pagination states
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // - Pagination code
  useEffect(() => {
    if (items) {
      if (items.length > 1) {
        const endOffset = itemOffset + pokemonPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / pokemonPerPage));
      }

      if (items.length === 1) {
        setCurrentItems(items);
        setPageCount(Math.ceil(items.length / pokemonPerPage));
      }
    }
  }, [itemOffset, pokemonPerPage, items]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * pokemonPerPage) % items.length;

    console.log(event.selected);
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
        <h2 className='text-red-500 text-xl font-medium w-2/3 mx-auto text-center p-2 shadow border-gray-200 rounded-md'>
          Loading Pokemon
        </h2>
      )}
      {!loading && !error && (
        <>
          <SearchField
            items={items}
            setItems={setItems}
            defaultPokemonList={defaultPokemonList}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            listOfGenerations={listOfGenerations}
            setListOfGenerations={setListOfGenerations}
            setPageReset={setPageReset}
            pokemonPerPage={pokemonPerPage}
            setPokemonPerPage={setPokemonPerPage}
            setNoPokemonFound={setNoPokemonFound}
            pageReset={pageReset}
            hasPageReset={hasPageReset}
            setHasPageReset={setHasPageReset}
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
                setDatabase={setDatabase}
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
