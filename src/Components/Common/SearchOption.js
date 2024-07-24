import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';

const SearchOption = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const onChangeData = (value) => {
    setValue(value);
    if (onSearch) onSearch(value); // pass the value to the parent
  };

  useEffect(() => {
    const searchInput = document.getElementById('search-options');
    searchInput.addEventListener('input', (e) => onChangeData(e.target.value));

    return () => {
      searchInput.removeEventListener('input', (e) => onChangeData(e.target.value));
    };
  }, []);

  return (
    <form className="app-search d-none d-md-block">
      <div className="position-relative">
        <Input
          type="text"
          className="form-control"
          placeholder="Search..."
          id="search-options"
          value={value}
          onChange={e => onChangeData(e.target.value)}
        />
        <span className="mdi mdi-magnify search-widget-icon"></span>
        <span className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none" id="search-close-options"></span>
      </div>
    </form>
  );
};

SearchOption.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchOption;