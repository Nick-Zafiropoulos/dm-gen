import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createShop, reset } from '../features/shops/shopSlice';
import Spinner from '../components/Spinner';

function NewShopOptions() {
    const [formData, setFormData] = useState({
        shop_name: '',
        shop_owner: '',
        shop_location: '',
        shop_itemCount: '',
        shop_categories: [],
        shop_rarities: [],
        shop_prices: 'fair',
    });

    // category data
    let weapon = false;
    let armor = false;
    let wondrousItem = false;
    let ring = false;
    let potion = false;
    let scroll = false;
    const categoryArray = [];

    // rarity data
    let common = false;
    let uncommon = false;
    let rare = false;
    let veryRare = false;
    let legendary = false;
    let artifact = false;
    const rarityArray = [];

    const { shop_name, shop_owner, shop_location, shop_itemCount, shop_categories, shop_rarities, shop_prices } =
        formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isSuccess, isError, message } = useSelector((state) => state.shop);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const priceChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            shop_prices: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // populate selected categories array
        if (weapon) {
            categoryArray.push('Weapon');
        }
        if (armor) {
            categoryArray.push('Armor');
        }
        if (wondrousItem) {
            categoryArray.push('Wondrous Item');
        }
        if (ring) {
            categoryArray.push('Ring');
        }
        if (potion) {
            categoryArray.push('Potion');
        }
        if (scroll) {
            categoryArray.push('Scroll');
        }

        // populate selected rarities array
        if (common) {
            rarityArray.push('Common');
        }
        if (uncommon) {
            rarityArray.push('Uncommon');
        }
        if (rare) {
            rarityArray.push('Rare');
        }
        if (veryRare) {
            rarityArray.push('Very Rare');
        }
        if (legendary) {
            rarityArray.push('Legendary');
        }
        if (artifact) {
            rarityArray.push('Artifact');
        }

        console.log(categoryArray);
        console.log(rarityArray);

        for (let element of categoryArray) {
            shop_categories.push(element);
        }

        const shopData = {
            shop_name,
            shop_owner,
            shop_location,
            shop_itemCount,
            shop_categories,
            shop_rarities,
            shop_prices,
        };
        dispatch(createShop({ shopData }));

        navigate('/shops');
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='ms-3'>
                <h1>Create an Item Shop</h1>
                <div className='input-group input-group-sm mb-3 w-25'>
                    <span className='input-group-text' id='inputGroup-sizing-sm'>
                        Custom Name
                    </span>
                    <input
                        type='text'
                        className='form-control'
                        id='shop_name'
                        name='shop_name'
                        value={shop_name}
                        aria-label='Sizing example input'
                        aria-describedby='inputGroup-sizing-sm'
                        onChange={onChange}
                    />
                </div>
                <div className='input-group input-group-sm mb-3 w-25'>
                    <span className='input-group-text' id='inputGroup-sizing-sm'>
                        Custom Owner
                    </span>
                    <input
                        type='text'
                        className='form-control'
                        id='shop_owner'
                        name='shop_owner'
                        value={shop_owner}
                        aria-label='Sizing example input'
                        aria-describedby='inputGroup-sizing-sm'
                        onChange={onChange}
                    />
                </div>
                <div className='input-group input-group-sm mb-3 w-25'>
                    <span className='input-group-text' id='inputGroup-sizing-sm'>
                        Location
                    </span>
                    <input
                        type='text'
                        className='form-control'
                        id='shop_location'
                        name='shop_location'
                        value={shop_location}
                        aria-label='Sizing example input'
                        aria-describedby='inputGroup-sizing-sm'
                        onChange={onChange}
                    />
                </div>
                <select
                    className='form-select mt-4 w-25'
                    aria-label='Default select example'
                    id='shop_itemCount'
                    name='shop_itemCount'
                    value={shop_itemCount}
                    onChange={onChange}
                >
                    <option defaultValue>How many items in the shop?</option>
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
                    <input
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='flexSwitchCheckDefault'
                        onChange={() => {
                            if (!weapon) {
                                weapon = true;
                            } else {
                                weapon = false;
                            }
                        }}
                    />
                    <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                        Weapons
                    </label>
                </div>
                <div className='form-check form-switch'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='flexSwitchCheckDefault'
                        onChange={() => {
                            if (!armor) {
                                armor = true;
                            } else {
                                armor = false;
                            }
                        }}
                    />
                    <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                        Armor
                    </label>
                </div>
                <div className='form-check form-switch'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='flexSwitchCheckDefault'
                        onChange={() => {
                            if (!ring) {
                                ring = true;
                            } else {
                                ring = false;
                            }
                        }}
                    />
                    <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                        Rings
                    </label>
                </div>
                <div className='form-check form-switch'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='flexSwitchCheckDefault'
                        onChange={() => {
                            if (!wondrousItem) {
                                wondrousItem = true;
                            } else {
                                wondrousItem = false;
                            }
                        }}
                    />
                    <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                        Wondrous Items
                    </label>
                </div>
                <div className='form-check form-switch'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='flexSwitchCheckDefault'
                        onChange={() => {
                            if (!scroll) {
                                scroll = true;
                            } else {
                                scroll = false;
                            }
                        }}
                    />
                    <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                        Scrolls
                    </label>
                </div>
                <div className='form-check form-switch'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='flexSwitchCheckDefault'
                        onChange={() => {
                            if (!potion) {
                                potion = true;
                            } else {
                                potion = false;
                            }
                        }}
                    />
                    <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                        Potions
                    </label>
                </div>
                <h6 className='mt-4'>What rarities of items are in the shop?</h6>
                <div className='form-check form-switch'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='flexSwitchCheckDefault'
                        onChange={() => {
                            if (!common) {
                                common = true;
                            } else {
                                common = false;
                            }
                        }}
                    />
                    <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                        Common
                    </label>
                </div>
                <div className='form-check form-switch'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='flexSwitchCheckDefault'
                        onChange={() => {
                            if (!uncommon) {
                                uncommon = true;
                            } else {
                                uncommon = false;
                            }
                        }}
                    />
                    <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                        Uncommon
                    </label>
                </div>
                <div className='form-check form-switch'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='flexSwitchCheckDefault'
                        onChange={() => {
                            if (!rare) {
                                rare = true;
                            } else {
                                rare = false;
                            }
                        }}
                    />
                    <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                        Rare
                    </label>
                </div>
                <div className='form-check form-switch'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='flexSwitchCheckDefault'
                        onChange={() => {
                            if (!veryRare) {
                                veryRare = true;
                            } else {
                                veryRare = false;
                            }
                        }}
                    />
                    <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                        Very Rare
                    </label>
                </div>
                <div className='form-check form-switch'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='flexSwitchCheckDefault'
                        onChange={() => {
                            if (!legendary) {
                                legendary = true;
                            } else {
                                legendary = false;
                            }
                        }}
                    />
                    <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                        Legendary
                    </label>
                </div>
                <div className='form-check form-switch'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='flexSwitchCheckDefault'
                        onChange={() => {
                            if (!artifact) {
                                artifact = true;
                            } else {
                                artifact = false;
                            }
                        }}
                    />
                    <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                        Artifact
                    </label>
                </div>

                <h6 className='mt-4'>How does the shopkeeper price his wares?</h6>
                <div className='form-check form-check-inline'>
                    <input
                        className='form-check-input'
                        type='radio'
                        name='inlineRadioOptions'
                        id='fair'
                        value='fair'
                        onClick={priceChange}
                    />
                    <label className='form-check-label' htmlFor='inlineRadio1'>
                        Fair
                    </label>
                </div>
                <div className='form-check form-check-inline'>
                    <input
                        className='form-check-input'
                        type='radio'
                        name='inlineRadioOptions'
                        id='overpriced'
                        value='overpriced'
                        onClick={priceChange}
                    />
                    <label className='form-check-label' htmlFor='inlineRadio2'>
                        Overpriced
                    </label>
                </div>
                <div className='form-check form-check-inline'>
                    <input
                        className='form-check-input'
                        type='radio'
                        name='inlineRadioOptions'
                        id='chaotic'
                        value='chaotic'
                        onClick={priceChange}
                    />
                    <label className='form-check-label' htmlFor='inlineRadio2'>
                        Chaotic
                    </label>
                </div>
                <div>
                    <button type='submit' className='btn btn-primary mt-4'>
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}

export default NewShopOptions;
