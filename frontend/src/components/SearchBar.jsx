import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SearchBar = ({ callback }) => {
    const [innerValue, setInnerValue] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        callback(innerValue);
    };

    return (
        <form className='searchBar input-group mb-3' onSubmit={handleSubmit}>
            <span class='input-group-text' id='basic-addon1'>
                Search
            </span>
            <input
                type='text'
                className='searchBarInput form-control'
                placeholder='Enter a shop name'
                value={innerValue}
                onChange={(e) => setInnerValue(e.target.value)}
            />
        </form>
    );
};

export default SearchBar;
