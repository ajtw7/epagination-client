const Search = ({ setSearchTerm }) => {
 
    const handleSearch = (e) => {
    setSearchTerm(e.target.value.replace(/ /g, '+'));
  };

  return (
    <div>
      <label>Search bar</label>
      <input
        type="text"
        placeholder="search..."
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default Search;