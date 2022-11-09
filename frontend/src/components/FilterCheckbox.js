import React from 'react';

class FilterCheckbox extends React.Component {
    render() {
        return (
            <div class='card w-25 m-3'>
                <div class='card-body'>
                    <h5 class='card-title'>Filters</h5>
                    <h6 class='card-subtitle mb-2 text-muted'>Choose all that apply:</h6>
                    <p class='card-text'>
                        <ul>
                            <li class='list-group-item'>
                                <input class='form-check-input me-1' type='checkbox' value='' id='firstCheckbox' />
                                <label class='form-check-label' for='firstCheckbox'>
                                    Shops
                                </label>
                            </li>
                            <li class='list-group-item'>
                                <input class='form-check-input me-1' type='checkbox' value='' id='secondCheckbox' />
                                <label class='form-check-label' for='secondCheckbox'>
                                    NPCs
                                </label>
                            </li>
                            <li class='list-group-item'>
                                <input class='form-check-input me-1' type='checkbox' value='' id='thirdCheckbox' />
                                <label class='form-check-label' for='thirdCheckbox'>
                                    Combatants
                                </label>
                            </li>
                            <li class='list-group-item'>
                                <input class='form-check-input me-1' type='checkbox' value='' id='thirdCheckbox' />
                                <label class='form-check-label' for='thirdCheckbox'>
                                    Location
                                </label>
                            </li>
                        </ul>
                    </p>
                </div>
            </div>
        );
    }
}

export default FilterCheckbox;
