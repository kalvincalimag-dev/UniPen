import React, { useState } from 'react';
import { useSearch } from '../context/SearchProvider';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const { handleSearch, resetSearch, searchResult } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    handleSearch(query);
  };

  const handleReset = (e) => {
    resetSearch();
    setQuery('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      resetSearch();
      setQuery('');
    }
  };

  return (
    <form className="relative " onSubmit={handleSubmit}>
      <div className="relative">
        <input
          value={query}
          onKeyDown={handleKeyDown}
          onChange={({ target }) => setQuery(target.value)}
          placeholder="Search..."
          className="border border-gray-300 rounded-md m-1 p-2 pl-8 pr-12 focus:ring-2 focus:ring-green-900 w-full transition duration-300 ease-in-out shadow-md hover:shadow-2xl"
          type="text"
        />
        {searchResult.length ? (
          <button
            onClick={handleReset}
            className="absolute inset-y-0 right-2 top-2/4 transform -translate-y-2/4 flex items-center justify-center text-gray-400 hover:text-gray-600 transition duration-300 ease-in-out"
            >
            <AiOutlineClose className="w-5 h-5" />
          </button>
        ) : (
            <div className="absolute inset-y-0 right-2 top-2/4 transform -translate-y-2/4 text-gray-400">
              <AiOutlineSearch className="w-5 h-5" />
            </div>
        )}
      </div>
    </form>
  );
}

