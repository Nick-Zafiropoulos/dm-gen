import React from 'react';

class NewShopOptions extends React.Component {
    render() {
        return (
            <form>
                <div className='ms-3'>
                    <h1>Create an Item Shop</h1>
                    <div className='input-group input-group-sm mb-3 w-25'>
                        <span className='input-group-text' id='inputGroup-sizing-sm'>
                            Custom Name
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            aria-label='Sizing example input'
                            aria-describedby='inputGroup-sizing-sm'
                        />
                    </div>
                    <div className='input-group input-group-sm mb-3 w-25'>
                        <span className='input-group-text' id='inputGroup-sizing-sm'>
                            Custom Owner
                        </span>
                        <input
                            type='text'
                            className='form-control'
                            aria-label='Sizing example input'
                            aria-describedby='inputGroup-sizing-sm'
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
                        />
                    </div>
                    <select className='form-select mt-4 w-25' aria-label='Default select example'>
                        <option selected>How many items in the shop?</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                    </select>
                    <h6 className='mt-4'>What types of items are in the shop?</h6>
                    <div className='form-check form-switch'>
                        <input class='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckDefault' />
                        <label class='form-check-label' for='flexSwitchCheckDefault'>
                            Weapons
                        </label>
                    </div>
                    <div className='form-check form-switch'>
                        <input class='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckDefault' />
                        <label class='form-check-label' for='flexSwitchCheckDefault'>
                            Armor
                        </label>
                    </div>
                    <div className='form-check form-switch'>
                        <input class='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckDefault' />
                        <label class='form-check-label' for='flexSwitchCheckDefault'>
                            Rings
                        </label>
                    </div>
                    <div className='form-check form-switch'>
                        <input class='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckDefault' />
                        <label class='form-check-label' for='flexSwitchCheckDefault'>
                            Wondrous Items
                        </label>
                    </div>
                    <div className='form-check form-switch'>
                        <input class='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckDefault' />
                        <label class='form-check-label' for='flexSwitchCheckDefault'>
                            Scrolls
                        </label>
                    </div>
                    <div className='form-check form-switch'>
                        <input class='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckDefault' />
                        <label class='form-check-label' for='flexSwitchCheckDefault'>
                            Potions
                        </label>
                    </div>
                    <h6 className='mt-4'>What rarities of items are in the shop?</h6>
                    <div className='form-check form-switch'>
                        <input class='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckDefault' />
                        <label class='form-check-label' for='flexSwitchCheckDefault'>
                            Common
                        </label>
                    </div>
                    <div className='form-check form-switch'>
                        <input class='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckDefault' />
                        <label class='form-check-label' for='flexSwitchCheckDefault'>
                            Uncommon
                        </label>
                    </div>
                    <div className='form-check form-switch'>
                        <input class='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckDefault' />
                        <label class='form-check-label' for='flexSwitchCheckDefault'>
                            Rare
                        </label>
                    </div>
                    <div className='form-check form-switch'>
                        <input class='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckDefault' />
                        <label class='form-check-label' for='flexSwitchCheckDefault'>
                            Very Rare
                        </label>
                    </div>
                    <div className='form-check form-switch'>
                        <input class='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckDefault' />
                        <label class='form-check-label' for='flexSwitchCheckDefault'>
                            Legendary
                        </label>
                    </div>
                    <div className='form-check form-switch'>
                        <input class='form-check-input' type='checkbox' role='switch' id='flexSwitchCheckDefault' />
                        <label class='form-check-label' for='flexSwitchCheckDefault'>
                            Artifact
                        </label>
                    </div>

                    <h6 className='mt-4'>How does the shopkeeper price his wares?</h6>
                    <div class='form-check form-check-inline'>
                        <input
                            class='form-check-input'
                            type='radio'
                            name='inlineRadioOptions'
                            id='inlineRadio1'
                            value='option1'
                        />
                        <label class='form-check-label' for='inlineRadio1'>
                            Fair
                        </label>
                    </div>
                    <div class='form-check form-check-inline'>
                        <input
                            class='form-check-input'
                            type='radio'
                            name='inlineRadioOptions'
                            id='inlineRadio2'
                            value='option2'
                        />
                        <label class='form-check-label' for='inlineRadio2'>
                            Overpriced
                        </label>
                    </div>
                    <div class='form-check form-check-inline'>
                        <input
                            class='form-check-input'
                            type='radio'
                            name='inlineRadioOptions'
                            id='inlineRadio2'
                            value='option2'
                        />
                        <label class='form-check-label' for='inlineRadio2'>
                            Chaotic
                        </label>
                    </div>
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

export default NewShopOptions;
