import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const PageHeader = ({ handleSetSelectedEmail, handleSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <header className='App-header'>
      <nav>
        <Link
          className='App-Link'
          to='/'
          onClick={() => {
            handleSetSelectedEmail('');
            handleSearch('');
          }}
        >
          <h1>Home</h1>
        </Link>
        <Link
          className='App-Link'
          to='/compose'
          onClick={() => {
            handleSetSelectedEmail('');
            handleSearch('');
          }}
        >
          <h1>Compose</h1>
        </Link>
      </nav>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch(searchText);
        }}
      >
        <input
          id='search'
          type='search'
          placeholder='Search'
          name='search'
          value={searchText}
          onChange={handleSearchChange}
        />
        <button type='submit'>Search</button>
      </form>
    </header>
  );
};
export default PageHeader;
