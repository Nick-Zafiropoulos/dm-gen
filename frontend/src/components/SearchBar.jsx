import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const SearchBar = ({ callback, searchType }) => {
    const [innerValue, setInnerValue] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        callback(innerValue);
    };

    return (
        <form className='searchBar input-group mb-3' onSubmit={handleSubmit}>
            <TextField
                sx={{ backgroundColor: 'transparent', color: 'white' }}
                fullWidth
                id='standard-basic'
                label={`Search ${searchType}`}
                variant='standard'
                type='text'
                className='searchBarInput form-control'
                placeholder={`Enter text to search for a ${searchType} name`}
                value={innerValue}
                onChange={(e) => setInnerValue(e.target.value)}
            />
            {/* <span class='input-group-text' id='basic-addon1'>
                Search
            </span>
            <input
                type='text'
                className='searchBarInput form-control'
                placeholder={`Enter text to search for a ${searchType} name`}
                value={innerValue}
                onChange={(e) => setInnerValue(e.target.value)}
            /> */}
        </form>
    );
};

export default SearchBar;
