import React, {useState} from 'react';
import {MVP} from "mvp.css";

const SearchBar = ({onSearch}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleSearch = () => {
        onSearch(searchQuery);
    };

    return (
        <div className="search-bar">
            <input
                type="search"
                placeholder="Search for beers..."
                value={searchQuery}
                onChange={handleInputChange}
            />
            <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
