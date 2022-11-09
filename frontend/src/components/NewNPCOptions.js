import React from 'react';

class NewNPCOptions extends React.Component {
    render() {
        return (
            <form>
                <div className='ms-3'>
                    <h1>Create an NPC</h1>
                    <div className='input-group input-group-sm mb-3 w-25'>
                        <span className='input-group-text' id='inputGroup-sizing-sm'>
                            Custom Name
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            aria-label='Sizing example input'
                            aria-describedby='inputGroup-sizing-sm'
                            placeholder='Leave blank for a generated result'
                        />
                    </div>
                    <div className='input-group input-group-sm mb-3 w-25'>
                        <span className='input-group-text' id='inputGroup-sizing-sm'>
                            Occupation
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            aria-label='Sizing example input'
                            aria-describedby='inputGroup-sizing-sm'
                            placeholder='Leave blank for a generated result'
                        />
                    </div>
                    <div className='input-group input-group-sm mb-3 w-25'>
                        <span className='input-group-text' id='inputGroup-sizing-sm'>
                            Location
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            aria-label='Sizing example input'
                            aria-describedby='inputGroup-sizing-sm'
                            placeholder='Leave blank for a generated result'
                        />
                    </div>
                    <select className='form-select mt-4 w-25' aria-label='Default select example'>
                        <option selected>What is their personality?</option>
                        <option value='1'>Generated</option>
                        <option value='2'>Outgoing</option>
                        <option value='3'>Reserved</option>
                        <option value='4'>Friendly</option>
                        <option value='5'>Hateful</option>
                        <option value='6'>Bubbly</option>
                        <option value='7'>Stoic</option>
                    </select>

                    <select className='form-select mt-4 w-25' aria-label='Default select example'>
                        <option selected>What are their flaws?</option>
                        <option value='1'>Generated</option>
                        <option value='2'>Takes risks</option>
                        <option value='3'>Can't make friends</option>
                        <option value='4'>Has to be the center of attention</option>
                        <option value='5'>Too careless with money</option>
                        <option value='6'>Always on edge</option>
                        <option value='7'>Constantly steals</option>
                    </select>
                    <div>
                        <button type='submit' className='btn btn-primary mt-4'>
                            Submit
                        </button>{' '}
                    </div>
                </div>
            </form>
        );
    }
}

export default NewNPCOptions;
