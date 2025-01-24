import React from 'react';
import '../../styles/components/searchBar.css';

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
