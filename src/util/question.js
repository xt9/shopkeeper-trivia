import items from "../data/items.json";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getItem(id) {
  return items.items.find(item => item.id === id);
}

export function getItems(ids = []) {
  return ids.map(id => items.items.find(item => item.id === id));
}

export function getRandomRecipeItem() {
  let recipeItems = items.items.filter(item => item.recipe);
  let randomIndex = getRandomInt(recipeItems.length);
  return recipeItems[randomIndex];
}

export function getRandomBaseItem() {
  let baseItems = items.items.filter(item => !item.recipe);
  let randomIndex = getRandomInt(baseItems.length);
  return baseItems[randomIndex];
}

export function getRandomItem() {
  let randomIndex = getRandomInt(items.items.length);
  return items.items[randomIndex];
}

export function getUniqueRecipeItem(blacklist = []) {
  let item = getRandomRecipeItem();

  if (blacklist.length > 0) {
    let duplicate = duplicates(blacklist, item);
    while (duplicate.length > 0) {
      item = getRandomRecipeItem();
      duplicate = duplicates(blacklist, item);
    }
  }
  return item;
}

export function getUniqueItem(blacklist = [], onlyBasicItems = true) {
  let item = onlyBasicItems ? getRandomBaseItem() : getRandomItem();

  let duplicate = duplicates(blacklist, item);
  if (blacklist.length > 0) {
    while (duplicate.length > 0) {
      item = onlyBasicItems ? getRandomBaseItem() : getRandomItem();
      duplicate = duplicates(blacklist, item);
    }
  }
  return item;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function getItemName(id) {
  return (id + '').split('_').join(' ');
}

const duplicates = (arr, item) => {
  return arr.filter(blItem => blItem.id === item.id);
}