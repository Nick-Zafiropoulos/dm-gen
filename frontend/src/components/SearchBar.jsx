import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const SearchBar = ({ callback, searchType }) => {
    const [innerValue, setInnerValue] = useState('');

    const [errorMessage, setErrorMessage] = useState({
        innerValue: '',
    });

    const disallowedSymbols = ['/', '=', '[', ']', '{', '}', ';', ':', '<', '>', '`', '~'];

    // Error message innerValue
    useEffect(() => {
        // Set errorMessage only if text includes disallowed symbols

        if (disallowedSymbols.some((el) => innerValue.includes(el))) {
            setErrorMessage((prevState) => ({
                ...prevState,
                innerValue: 'Contains disallowed character',
            }));
        }
    }, [innerValue]);

    useEffect(
        (e) => {
            // Set empty erroMessage only if text does not include disallowed symbols
            // and errorMessage is not empty.
            // avoids setting empty errorMessage if the errorMessage is already empty
            if (!disallowedSymbols.some((el) => innerValue.includes(el)) && errorMessage.innerValue) {
                setErrorMessage((prevState) => ({
                    ...prevState,
                    innerValue: '',
                }));
            }
        },
        [innerValue, errorMessage.innerValue]
    );

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
                error={disallowedSymbols.some((el) => innerValue.includes(el))}
                helperText={errorMessage.innerValue}
                inputProps={{ pattern: '[A-Za-z0-9\'".!?@#$%^&*_+-,() ]{1,}' }}
                label={`Search ${searchType}`}
                variant='standard'
                type='text'
                className='searchBarInput form-control'
                placeholder={`Enter text to search for ${searchType}`}
                value={innerValue}
                onChange={(e) => setInnerValue(e.target.value)}
            />
        </form>
    );
};

export default SearchBar;
