import React, { useState } from 'react';
import '../App.css';

const SearchBar = ({ onSearch, setCity }) => {
    const [name, setName] = useState("");

    const handleClick = () => {
        if (name !== "") {
            onSearch(name);
            setName(""); // Clear input field after search
            setCity(""); // Clear city state after search
        }
    };

    return (
        <div className='search-bar'>
            <input 
                type='text' 
                placeholder='Search for a city' 
                value={name}  // Controlled component
                onChange={(e) => setName(e.target.value)} 
                className='px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600 w-full max-w-sm'
            />
            <button 
                onClick={handleClick} 
                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg focus:outline-none'
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
