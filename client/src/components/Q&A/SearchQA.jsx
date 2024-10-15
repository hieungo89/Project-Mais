import React from 'react';

const SearchQA = ({ handleSearch }) => (
  <>
    <input className="question-input" size="67" type="text" placeholder="Have a question? Search for answers..." onChange={(e) => handleSearch(e.target.value)} />
    <i className="fa-solid fa-magnifying-glass" />
  </>
);

export default SearchQA;