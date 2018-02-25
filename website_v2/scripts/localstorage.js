
let inMemoryStorage = {}; 

var storage = window.localStorage;
var padLocationsToUpdate;

function isSupported(storage) {
  try {
    const key = "__intiationkey";
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


function setStorage() {
  // Check for local storate
  if (isSupported(storage)) {

    // If this is the user's first time
    if (getItem("userID") == null) {
        // Otherwise, set up initial the items
        var newUserID = uuidv4();

        setItem("userID", newUserID);

        // Set up initial items
        setItem("currentSlide", currentSlide);
        // setItem("padLocations", JSON.stringify(padLocations));
        // setItem("padCoordinates", JSON.stringify(padCoordinates));

        console.log("Registering a new user as " + newUserID);
    }
    else {
      // Otherwise, we don't have to set up any new items
      console.log("Pre-existing user is " + getItem("userID"));
    }
  }
  else {
    console.log("Localstorage is not supported");
  }
}


// function testStorage() {
//   // Check for local storate
//   if (isSupported(storage)) {

//     // If we've already visited and set a unique ID
//     if (setItem("userID").userID !== 0) {
//       // Then we don't have to set any new items.
//       console.log("Pre-existing user is " + getItem("userID"));
//     }
//     else {

//       // Otherwise, set up initial the items
//       var newUserID = uuidv4();

//       // Set up initial items
//       setItem("currentSlide", currentSlide);
//       setItem("padLocations", JSON.stringify(padLocations));
//       setItem("padCoordinates", JSON.stringify(padCoordinates));

//       console.log("Registering a new user as " + newUserID);
//     }
//   }
//   else {
//     console.log("Localstorage is not supported");
//   }
// }


// testStorage();
setStorage();



// Update state
function updateStorageState() {

  // Update the initial items
  setItem("currentSlide", currentSlide);
  // setItem("padLocations", JSON.stringify(padLocations));
  // setItem("padCoordinates", JSON.stringify(padCoordinates));

  var userObject = {
      "userEmotion" : padCoordinates[0],
      "model_data_1" : padCoordinates[1],
      "model_data_2" : padCoordinates[2],
      "model_data_3" : padCoordinates[3],
      "model_data_4" : padCoordinates[4],
      "model_data_5" : padCoordinates[5],
      "model_data_6" : padCoordinates[6],
      // "model_data_7" : padCoordinates[7],
      // "model_data_8" : padCoordinates[8]
  };

  setItem("survey", JSON.stringify(userObject));

  // var retrivedUserObject = localStorage.getItem('survey');
  // console.log(JSON.parse(retrivedUserObject));
}


// Before the user goes to the final submission 
function primeSubmitInfo() {

  var prelimSlide = document.getElementsByClassName('prep-data');

  // As long the slides are loaded
  if (prelimSlide[0] !== undefined) {
  
    // Assign the event listener to all prelim slides
    for (var i = 0; i < prelimSlide.length; i++) {

      prelimSlide[i].addEventListener("click", function(event) {

        document.getElementsByName("time_stamp")[0].value = getTimeStamp();
        document.getElementsByName("user_id")[0].value = getItem("userID");
        
        // var coords = JSON.parse(localStorage.getItem('padCoordinates'));
        // Pad coordinate data to set the values with

        // Clone the pad locations
        padLocationsToUpdate = padCoordinates;

        // Set the form values to pad coordinates
        document.getElementsByName("user_emotion")[0].value = JSON.stringify(padLocationsToUpdate[0]);

        document.getElementsByName("model_data_1")[0].value = JSON.stringify(padLocationsToUpdate[1]);
        document.getElementsByName("model_data_2")[0].value = JSON.stringify(padLocationsToUpdate[2]);
        document.getElementsByName("model_data_3")[0].value = JSON.stringify(padLocationsToUpdate[3]);
        document.getElementsByName("model_data_4")[0].value = JSON.stringify(padLocationsToUpdate[4]);
        document.getElementsByName("model_data_5")[0].value = JSON.stringify(padLocationsToUpdate[5]);
        document.getElementsByName("model_data_6")[0].value = JSON.stringify(padLocationsToUpdate[6]);
        // document.getElementsByName("model_data_7")[0].value = JSON.stringify(padLocationsToUpdate[7]);
        // document.getElementsByName("model_data_8")[0].value = JSON.stringify(padLocationsToUpdate[8]);


        console.log("Current pad coordinates:");
        console.log(padLocationsToUpdate);
      });
    }
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

  var now = new Date;
  
  return now.customFormat( "#DD#/#MM#/#YYYY# #hh#:#mm#:#ss#" );
}

//*** This code is copyright 2002-2016 by Gavin Kistner, !@phrogz.net
//*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
Date.prototype.customFormat = function(formatString){
  var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
  YY = ((YYYY=this.getFullYear())+"").slice(-2);
  MM = (M=this.getMonth()+1)<10?('0'+M):M;
  MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
  DD = (D=this.getDate())<10?('0'+D):D;
  DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
  th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
  formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
  h=(hhh=this.getHours());
  if (h==0) h=24;
  if (h>12) h-=12;
  hh = h<10?('0'+h):h;
  hhhh = hhh<10?('0'+hhh):hhh;
  AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
  mm=(m=this.getMinutes())<10?('0'+m):m;
  ss=(s=this.getSeconds())<10?('0'+s):s;
  return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};


// https://script.google.com/macros/u/0/s/AKfycbwtNm_Uckr4DVOuKwKZGuDx7BMEUJ95ijN17TNo1noBGrgolhY/exec