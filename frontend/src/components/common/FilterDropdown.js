import React from 'react';
import { AiOutlineFilter } from 'react-icons/ai';
import '../../styles/components/filterDropdown.css';

const FilterDropdown = ({ isOpen, toggle, filters, setFilters, options }) => {
  const handleChange = (key, value) => {
    setFilters(key, value); 
  };

  return (
    <div className="filter-dropdown">
      <button className="filter-button" onClick={toggle}>
        <AiOutlineFilter className="filter-icon" />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div className="dropdown-item" key={option.key}>
              <label htmlFor={`${option.key}-filter`}>{option.label}:</label>
              <select
                id={`${option.key}-filter`}
                value={filters[option.key] || ''}
                onChange={(e) => handleChange(option.key, e.target.value)}
              >
                <option value="">Todos</option>
                {option.values.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default FilterDropdown;
