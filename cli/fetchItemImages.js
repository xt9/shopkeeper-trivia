const fetch = require("node-fetch");
const { writeFile } = require("fs");
const { promisify } = require('util');
const writeFilePromise = promisify(writeFile);

const items = require('../src/data/items.json');

let queryPath = (id) => {
    return `https://dota2.gamepedia.com/api.php?action=query&format=json&titles=File:${id}_icon.png&prop=imageinfo&iiprop=url`;
};

items.baseItems.forEach(item => {
    saveIcon(item.id);
});

items.recipeItems.forEach(item => {
    saveIcon(item.id);
});

async function saveIcon(id) {
    const data = await fetch(queryPath(id));
    const json = await data.json();
    let imageUrl = json.query.pages[Object.getOwnPropertyNames(json.query.pages)].imageinfo[0].url;
    fetch(imageUrl)
        .then(response => response.arrayBuffer())
        .then(arr => writeFilePromise(`${__dirname}/../src/assets/items/${id}.png`, Buffer.from(arr)))
        .catch(err => console.error(err));
}