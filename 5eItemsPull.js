const axios = require('axios');

const generatedItemList = async () => {
    // setting up rarities
    const common = true;
    const uncommon = true;
    const rare = true;
    const veryRare = true;
    const legendary = true;
    const allowedRarities = [];
    if (common) {
        allowedRarities.push('Common');
    }
    if (uncommon) {
        allowedRarities.push('Uncommon');
    }
    if (rare) {
        allowedRarities.push('Rare');
    }
    if (veryRare) {
        allowedRarities.push('Very Rare');
    }
    if (legendary) {
        allowedRarities.push('Legendary');
    }

    // setting up categories
    const weapon = true;
    const armor = true;
    const wondrousItem = true;
    const ring = true;
    const potion = false;
    const scroll = false;
    const allowedCategories = [];
    if (weapon) {
        allowedCategories.push('Weapon');
    }
    if (armor) {
        allowedCategories.push('Armor');
    }
    if (wondrousItem) {
        allowedCategories.push('Wondrous Item');
    }
    if (ring) {
        allowedCategories.push('Ring');
    }
    if (potion) {
        allowedCategories.push('Potion');
    }
    if (scroll) {
        allowedCategories.push('Scroll');
    }

    // initializing the shop list
    const itemList = [];
    let i = 0;

    // get API database list of item URLs
    const res = await axios.get('https://www.dnd5eapi.co/api/magic-items');
    itemArray = res.data.results.map((object) => object);

    while (i <= 10) {
        // pick random item and retrieve it from API
        const randomItemUrl = itemArray[Math.floor(Math.random() * itemArray.length)].url;
        const randomItem = await axios.get(`https://www.dnd5eapi.co${randomItemUrl}`);

        // check if retrieved item matches criteria for shop, if yes then add to the list
        if (
            allowedRarities.includes(randomItem.data.rarity.name) &&
            allowedCategories.includes(randomItem.data.equipment_category.name)
        ) {
            itemList.push(randomItem.data);
            i++;
        }
    }
    console.log(itemList);
};

// randomItemData();
generatedItemList();
