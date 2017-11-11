
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


var user = { 
    "userID" : 0,
    "userCompletedSurvey" : false
  };


var results = [
  { 
    "padLocations" : undefined,
    "submittedTimeStamp" : undefined

  }
];


function setStorage() {
  // Check for local storate
  if (isSupported(storage)) {

    // If we've already visited and set a unique ID
    if (getItem("userID").userID !== 0) {
      // Then we don't have to set any new items.
      console.log("Pre-existing user is " + getItem("userID"));
    }
    else {

      // Otherwise, set up initial the items
      var newUserID = uuidv4();

      // Set up initial items
      setItem("currentSlide", currentSlide);
      setItem("padLocations", padLocations);

      console.log("Registering a new user as " + newUserID);
    }
  }
}

setStorage();

// Update state
function updateStorageState() {

  // Update the initial items
  setItem("currentSlide", currentSlide);
  setItem("padLocations", padLocations);

  setItem("survey", 
  {
    "userEmotion" : padLocations[0],
    "model_data_1" : padLocations[1],
    "model_data_2" : padLocations[2],
    "model_data_3" : padLocations[3],
    "model_data_4" : padLocations[4],
    "model_data_5" : padLocations[5],
    "model_data_6" : padLocations[6],
    "model_data_7" : padLocations[7],
    "model_data_8" : padLocations[8]
  });
}


// Before the user goes to the final submission 
function primeSubmitInfo() {
  var prelimSlide = document.getElementsByClassName('prep-data');

  if (prelimSlide[0]) {
    prelimSlide[0].addEventListener("click", function(event) {

      console.log("priming survey");

      document.getElementsByName("time_stamp")[0].value = getTimeStamp();
      document.getElementsByName("user_id")[0].value = getItem("userID");
      document.getElementsByName("user_emotion")[0].value = getItem("survey");
      document.getElementsByName("model_data_1")[0].value = getItem("survey");
      document.getElementsByName("model_data_2")[0].value = getItem("survey");
      document.getElementsByName("model_data_3")[0].value = getItem("survey");
      document.getElementsByName("model_data_4")[0].value = getItem("survey");
      document.getElementsByName("model_data_5")[0].value = getItem("survey");
      document.getElementsByName("model_data_6")[0].value = getItem("survey");
      document.getElementsByName("model_data_7")[0].value = getItem("survey");
      document.getElementsByName("model_data_8")[0].value = getItem("survey");
    });
  }

}

primeSubmitInfo();


function primeSurveySubmission() {

  var $form = $('form#survey-form');
  var url = 'https://script.google.com/macros/s/AKfycbwtNm_Uckr4DVOuKwKZGuDx7BMEUJ95ijN17TNo1noBGrgolhY/exec';

  // console.log($form);

  $('#button-submit').on('click', function(e) {

    console.log("Submitting form");

    e.preventDefault();

    var jqxhr = $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      data: $form.serializeObject()
    });
  })
}

primeSurveySubmission();

function getTimeStamp() {
  if (!Date.now) {
    Date.now = function now() {
      return new Date().getTime();
    };
  }
  
  return Date.now();
}






// https://script.google.com/macros/u/0/s/AKfycbwtNm_Uckr4DVOuKwKZGuDx7BMEUJ95ijN17TNo1noBGrgolhY/exec