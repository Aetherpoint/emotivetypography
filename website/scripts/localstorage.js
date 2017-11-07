
let inMemoryStorage = {}; 

var storage = window.localStorage;

function isSupported(storage) {
  try {
    const key = "__some_random_key_you_are_not_going_to_use__";
    storage.setItem(key, key);
    storage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

function getItem(key) {
  if (isSupported(storage)) {
    return storage.getItem(key);
  }
  return inMemoryStorage[key] || null;
}

function setItem(key, value) {
  if (isSupported(storage)) {
    storage.setItem(key, value);
  } else {
    inMemoryStorage[key] = value;
  }
}

function removeItem(key) {
  if (isSupported(storage)) {
    storage.removeItem(key);
  } else {
    delete inMemoryStorage[key];
  }
}

function clear(key) {
  if (isSupported(storage)) {
    storage.clear();
  } else {
    inMemoryStorage = {};
  }
}

function key(n) {
  if (isSupported(storage)) {
    return storage.key(n);
  } else {
     return Object.keys(inMemoryStorage)[n] || null;
  }
}


console.log(isSupported(storage));


// Check for local storate
if (isSupported(storage)) {

  // Visited


  // Set up initial items
  setItem("currentSlide", currentSlide);
  setItem("padLocations", padLocations);

}


// Update state
function updateStorageState() {

  // Set up initial items
  setItem("currentSlide", currentSlide);
  setItem("padLocations", padLocations);
}
