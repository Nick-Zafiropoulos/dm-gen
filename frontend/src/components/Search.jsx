import React from 'react';

class Search extends React.Component {
    render() {
        return (
            <div className='input-group mb-3 mt-3 ms-3 w-50'>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Search by keyword'
                    aria-label='Search by keyword'
                    aria-describedby='button-addon2'
                />
                <button className='btn btn-outline-secondary' type='button' id='button-addon2'>
                    Search
                </button>
            </div>
        );
    }
}

export default Search;
