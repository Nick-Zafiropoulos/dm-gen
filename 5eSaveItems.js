const axios = require('axios');
const { MongoClient } = require('mongodb');

const pullItems = async () => {
    // get API database list of item URLs
    const res = await axios.get('https://www.dnd5eapi.co/api/magic-items');

    const urlArray = res.data.results.map((object) => object);

    // for each item, get data from API
    let i = 0;
    const itemDataArray = [];

    while (i < urlArray.length) {
        let itemData = await axios.get(`https://www.dnd5eapi.co${urlArray[i].url}`);
        itemDataArray.push(itemData.data);
        i++;
    }

    let j = 0;
    const itemSaveArray = [];
    while (j < itemDataArray.length) {
        itemSaveArray[j] = {
            item_name: itemDataArray[j].name,
            item_desc: itemDataArray[j].desc,
            equipment_category: itemDataArray[j].equipment_category.name,
            item_rarity: itemDataArray[j].rarity.name,
            item_cursed: false,
        };
        j++;
    }

    // console.log(itemSaveArray);

    const uri =
        'mongodb+srv://NickZ:MQVzjbabotlZ8K3q@dmgencluster.w7mtfxq.mongodb.net/dmgen?retryWrites=true&w=majority';
    const client = new MongoClient(uri);

    async function run() {
        try {
            const database = client.db('dmgen');
            const items = database.collection('items');
            // create a document to insert

            let k = 0;
            while (k < itemSaveArray.length) {
                const result = await items.insertOne(itemSaveArray[k]);

                k++;
            }

            console.log(`A document was inserted with the _id: ${result.insertedId}`);
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
};

pullItems();
