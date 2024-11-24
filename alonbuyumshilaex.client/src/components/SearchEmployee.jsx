import React, { useState } from "react";

const SearchEmployee = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); 
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search employee by name"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchEmployee;