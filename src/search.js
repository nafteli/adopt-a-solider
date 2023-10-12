import "./Search.css";

export const SearchByName = ({searchInput, setSearchInput, setAdd}) => {
  const onInputChange = (value) => {
    setSearchInput(value);
  };
  return (
    <div className="formWrapper">
    <div className="changeAddButton" onClick={() => setAdd(true)}>הוספת שם</div>
    <div className="searhContainer">
      <div className="searchText">חיפוש</div>
      <input
        placeholder="מצא שם"
        className="searchInput"
        type="text"
        name="search"
        onChange={(e) => onInputChange(e.target.value)}
        value={searchInput}
      ></input>
    </div>
    </div>
  );
};
