import React from 'react';
import '../styles/style.css'

interface Props {
    value : string,
    OnChange: (newValue: string) => void,
  }
  
  const SearchBar : React.FC<Props> = ({ value, OnChange }) => {
    return (
      <div>
        <input 
          className="searchBar"
          type="text" 
          placeholder="Cari Shop" 
          value={value}
          onChange={(e) => OnChange(e.target.value)}
        />
      </div> 
    ); 
  };
  
  export default SearchBar;