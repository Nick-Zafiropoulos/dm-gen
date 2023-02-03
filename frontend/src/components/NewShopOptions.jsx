import React from 'react';
import { useState, useEffect, useRef } from 'react';
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
    });

    // category data
    const categories = useRef({
        weapon: false,
        armor: false,
        wondrousItem: false,
        ring: false,
        potion: false,
        scroll: false,
        wand: false,
        staff: false,
    });

    const categoryArray = [];

    // rarity data
    const rarities = useRef({
        common: false,
        uncommon: false,
        rare: false,
        veryRare: false,
        legendary: false,
        artifact: false,
    });

    const rarityArray = [];

    const { shop_name, shop_owner, shop_location, shop_itemCount, shop_categories, shop_rarities } = formData;

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

    const onSubmit = async (e) => {
        e.preventDefault();

        // populate selected categories array
        if (categories.weapon) {
            categoryArray.push('Weapon');
        }
        if (categories.armor) {
            categoryArray.push('Armor');
        }
        if (categories.wondrousItem) {
            categoryArray.push('Wondrous Items');
        }
        if (categories.ring) {
            categoryArray.push('Ring');
        }
        if (categories.potion) {
            categoryArray.push('Potion');
        }
        if (categories.scroll) {
            categoryArray.push('Scroll');
        }
        if (categories.wand) {
            categoryArray.push('Wand');
        }
        if (categories.staff) {
            categoryArray.push('Staff');
        }

        // populate selected rarities array
        if (rarities.common) {
            rarityArray.push('Common');
        }
        if (rarities.uncommon) {
            rarityArray.push('Uncommon');
        }
        if (rarities.rare) {
            rarityArray.push('Rare');
        }
        if (rarities.veryRare) {
            rarityArray.push('Very Rare');
        }
        if (rarities.legendary) {
            rarityArray.push('Legendary');
        }
        if (rarities.artifact) {
            rarityArray.push('Artifact');
        }

        for (let element of categoryArray) {
            shop_categories.push(element);
        }

        for (let element of rarityArray) {
            shop_rarities.push(element);
        }

        // reset categories
        categories.current.weapon = false;
        categories.current.armor = false;
        categories.current.wondrousItem = false;
        categories.current.ring = false;
        categories.current.potion = false;
        categories.current.scroll = false;
        categories.current.wand = false;
        categories.current.staff = false;

        // reset rarities
        rarities.current.common = false;
        rarities.current.uncommon = false;
        rarities.current.rare = false;
        rarities.current.veryRare = false;
        rarities.current.legendary = false;
        rarities.current.artifact = false;

        const shopData = {
            shop_name,
            shop_owner,
            shop_location,
            shop_itemCount,
            shop_categories,
            shop_rarities,
        };
        await dispatch(createShop({ shopData }));

        navigate('/campaign');
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
                            if (!categories.weapon) {
                                categories.weapon = true;
                            } else {
                                categories.weapon = false;
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
                            if (!categories.armor) {
                                categories.armor = true;
                            } else {
                                categories.armor = false;
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
                            if (!categories.ring) {
                                categories.ring = true;
                            } else {
                                categories.ring = false;
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
                            if (!categories.wondrousItem) {
                                categories.wondrousItem = true;
                            } else {
                                categories.wondrousItem = false;
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
                            if (!categories.scroll) {
                                categories.scroll = true;
                            } else {
                                categories.scroll = false;
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
                            if (!categories.potion) {
                                categories.potion = true;
                            } else {
                                categories.potion = false;
                            }
                        }}
                    />
                    <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                        Potions
                    </label>
                </div>
                <div className='form-check form-switch'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='flexSwitchCheckDefault'
                        onChange={() => {
                            if (!categories.wand) {
                                categories.wand = true;
                            } else {
                                categories.wand = false;
                            }
                        }}
                    />
                    <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                        Wands
                    </label>
                </div>
                <div className='form-check form-switch'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='flexSwitchCheckDefault'
                        onChange={() => {
                            if (!categories.staff) {
                                categories.staff = true;
                            } else {
                                categories.staff = false;
                            }
                        }}
                    />
                    <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                        Staves
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
                            if (!rarities.common) {
                                rarities.common = true;
                            } else {
                                rarities.common = false;
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
                            if (!rarities.uncommon) {
                                rarities.uncommon = true;
                            } else {
                                rarities.uncommon = false;
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
                            if (!rarities.rare) {
                                rarities.rare = true;
                            } else {
                                rarities.rare = false;
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
                            if (!rarities.veryRare) {
                                rarities.veryRare = true;
                            } else {
                                rarities.veryRare = false;
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
                            if (!rarities.legendary) {
                                rarities.legendary = true;
                            } else {
                                rarities.legendary = false;
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
                            if (!rarities.artifact) {
                                rarities.artifact = true;
                            } else {
                                rarities.artifact = false;
                            }
                        }}
                    />
                    <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                        Artifact
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
