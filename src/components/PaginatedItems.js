import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import ListDisplay from './ListDisplay';
import '../styles/pagination.scss';
import SearchField from './SearchField';
import FilterOptionsList from './FilterOptionsList';

export default function PaginatedItems({
  itemsPerPage,
  items,
  error,
  setError,
  loading,
  setLoading,
  setItems,
  defaultPokemonList,
}) {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [filteredList, setFilteredList] = useState(null);
  const [filterOptions, setFilterOptions] = useState(false);
  const [listOfGenerations, setListOfGenerations] = useState();
  const [pageReset, setPageReset] = useState(null);
  const [pokemonName, setPokemonName] = useState({});

  useEffect(() => {
    // - the amount of pokemon in existence
    const fetchDetails = async () => {
      //   setLoading(true);
      try {
        if (pokemonName) {
          const data = await axios(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName.name}`
          );

          setPokemonDetail(data.data);
        }

        // setError(false);
        // setLoading(false);
      } catch (err) {
        // console.log(err);
        // setError(true);
        // setLoading(false);
      }
    };
    fetchDetails();
  }, [pokemonName]);

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
        const endOffset = itemOffset + itemsPerPage;
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
      }

      if (items.length === 1) {
        setCurrentItems(items);
        setPageCount(Math.ceil(items.length / itemsPerPage));
      }
    }
  }, [itemOffset, itemsPerPage, items]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
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
              />
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
                forcePage={pageReset}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
