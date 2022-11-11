import React from 'react';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import FilterCheckbox from '../components/FilterCheckbox';
import FilterResults from '../components/FilterResults';

class Campaign extends React.Component {
    render() {
        return (
            <div>
                <Navbar />

                <div className='row'>
                    <div className='col'>
                        <Search />
                        <FilterCheckbox />
                    </div>
                    <div className='col'>
                        <FilterResults />
                    </div>
                </div>
            </div>
        );
    }
}

export default Campaign;
