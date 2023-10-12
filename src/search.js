export const SearchByName = ({searchInput, setSearchInput}) => {
  const onInputChange = (value) => {
    setSearchInput(value);
  };
  return (
    <div>
      <input
        type="text"
        name="search"
        onChange={(e) => onInputChange(e.target.value)}
        value={searchInput}
      ></input>
    </div>
  );
};
