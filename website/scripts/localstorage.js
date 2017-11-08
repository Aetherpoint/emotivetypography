
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

/* Generate a unique ID */
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

console.log(isSupported(storage));

function setStorage() {
  // Check for local storate
  if (isSupported(storage)) {

    // If we've already visited and set a unique ID
    if (getItem("userID")) {
      // Then we don't have to set any new items.
      console.log("Pre-existing user is " + getItem("userID"));
    }
    else {

      var newUser = uuidv4();

      // Otherwise, set up initial the items
      setItem("currentSlide", currentSlide);
      setItem("padLocations", padLocations);
      setItem("userID", newUser);

      console.log("Registering a new user as " + newUser);
    }
  }
}

setStorage();

// Update state
function updateStorageState() {

  // Set up initial items
  setItem("currentSlide", currentSlide);
  setItem("padLocations", padLocations);
}



function getTimeStamp() {
  if (!Date.now) {
    Date.now = function now() {
      return new Date().getTime();
    };
  }
  
  return Date.now();
}
