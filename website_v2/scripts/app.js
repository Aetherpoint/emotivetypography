

/* Elements */
var sliderComponent = document.getElementById('slide-container');
var slides = sliderComponent.querySelectorAll("#slide-container > div");

/* Data */
var currentSlide = 0;
var padLocations = [];
var padCoordinates = [];

var surveySlideMin = 1;
var surveySlideMax = 7;


// Make a place to save data for each pad location
function populatePadLocations() {
	for (var i = 0; i < slides.length; i++) {
		
		// If there's a pad on that slide then add that information.
		if (slides[i].querySelectorAll('.pad')[0]) {

			// console.log(slides[i].querySelectorAll('.pad')[0]);

			padLocations.push({ "x": 0, "y": 0 });
			padCoordinates.push({ "x": 0, "y": 0 });
		}
	}
}


function pushPadLocUpdate(locX, locY) {

	// Make sure the current slide is within
	// our range of items
	if ((currentSlide >= surveySlideMin) && (currentSlide <= surveySlideMax)) {

		padLocations[currentSlide - 1] = { locX, locY };

		var x = padLocToCoordinates(locX);
		var y = padLocToCoordinates(locY);

		padCoordinates[currentSlide - 1] = { x, y };
	}
	else {
		// Otherwise slide information would add a 0,0 where there is no information.
	}
}


// Takes the world locations and boils them down to coordinate spaces
function padLocToCoordinates (axisVal) {
	
	var coordinateLocation = 0;

	const gridSize = 300;
	const gridDivisionSize = 10;

	var gridBoxUnit = gridSize / gridDivisionSize;

	// Check for 0 values
	if (axisVal === 0) {

	}
	else {
		for (var i = 0; i < gridDivisionSize; i++) {

			// Check locations that match the grid
			if (axisVal === gridBoxUnit * i) {
				coordinateLocation = i;
			}
			else if (axisVal === ((gridBoxUnit * i) * -1)) {
				coordinateLocation = i * -1;
			}
		}
	}

	return coordinateLocation;
}

function advanceSlide() {
	currentSlide++;
	renderSlideUpdate();

	// Re init slide marker location?
	// initPadMarker();
}
function backupSlide() {
	currentSlide--;
	renderSlideUpdate();

	// Re init slide marker location?
	// initPadMarker();
}

// TODO: RENABLE THESE!
function hideSlide(slideElement) {

	// console.log("Hiding " + slideElement);
	slideElement.style.display = "none";
}

function showSlide(slideElement) {

	// console.log("Showing " + slideElement);
	slideElement.style.display = "flex";
}

// Update the slides
function renderSlideUpdate() {
	for (var i = 0; i < slides.length; i++) {
		
		// Hide and show the current slide
		if (i === currentSlide) {
			showSlide(slides[i]);

			// console.log(slides[i]);
		}
		else {
			hideSlide(slides[i]);

			// console.log(slides[i]);
		}
	}
}


// Get the slides ready for transitioning
function prepSlides() {
	var sliderComponent = document.getElementById('slide-container');
	var slides = sliderComponent.querySelectorAll("#slide-container > div");

	// console.log(slides.length);

	for (var i = 0; i < slides.length; i++) {

		// console.log(i);
		
		// Attack event listeners to the slide buttons

		// If the slide has a button to advance, then add an event listener
		if (slides[i].querySelectorAll('.button-left')[0]) {
			// slides[i].querySelectorAll('.button-left')

			// console.log(slides[i].querySelectorAll('.button-left')[0]);

			slides[i].querySelectorAll('.button-left')[0].addEventListener("click", function(event) {
			    
			    // console.log("Hit Left");
			    // backupSlide();
			});
		}
		if (slides[i].querySelectorAll('.button-right')[0]) {

			// console.log(slides[i].querySelectorAll('.button-right')[0]);

			slides[i].querySelectorAll('.button-right')[0].addEventListener("click", function(event) {
			    
				// console.log("Hit Right");
			    advanceSlide();
			});
		}

		// console.log(slides[i].querySelectorAll('.button-right'));
		// slides[i].style.display = "flex";
	}
}

var padWidth = 0;
var padHeight = 0;

function initPad() {
	var pads = document.getElementsByClassName('pad');

	padWidth = pads[0].getBoundingClientRect().width;
	padHeight = pads[0].getBoundingClientRect().height;

	// console.log(padWidth, padHeight);
}


function dividePadGrid(axis) {

	if ((padWidth > 0) && (padHeight > 0)) {

		console.log("Grid size: " + padWidth + ", " + padHeight);

		if (axis === "x") {
			console.log(((padWidth / 10)));
			return ((padWidth / 10));
		}
		else if (axis === "y") {
			console.log(((padHeight / 10)));
			return ((padHeight / 10));
		}
		else {
			console.log("No axis provided for the pad, please pass an 'x' or a 'y'");
		}
	}
	else {
		console.log("Pad width and height are 0, we need space to subdivide them.");
	}
}

// Center the pad marker
// function centerPadMarker () {
// 	var element = document.getElementById('grid-snap'),
// 	x = 0, y = 0;

// 	x = (dividePadGrid("x") * 5);
// 	y = (dividePadGrid("y") * 5);

// 	element.style.webkitTransform =
// 	element.style.transform =
// 	'translate(' + x + 'px, ' + y + 'px)';

// 	pushPadLocUpdate(x, y);
// }

function initAllPadMarkers () {
	// var element = document.getElementById('grid-snap'),

    for (var i = 0; i < surveySlideMax; i++) {
    	initPadMarker(i);
    }
}


function initPadMarker(elementIndex) {
	x = 0, y = 0;

	var currentPad = "#grid-snap-" + elementIndex;

	console.log("Initing " + currentPad);

	interact(currentPad)
    .draggable({
		// the top left corner of the element will be (0, 0)
		origin: 'parent',
        snap: {
        		// snap targets pay attention to the action's origin option
            targets: [
                interact.createSnapGrid({
                    x: 30,
                    y: 30,
                    offset: { x: 15, y: 15 }
                })
            ],
            relativePoints: [
            	{ x: 0, y: 0 }
            ]
        },
        restrict: {
        		// restrictions *don't* pay attention to the action's origin option
            // so using 'parent' for both origin and restrict.restriction works
            restriction: 'parent',
            elementRect: {top: 0.5, left: 0.5, bottom: 0.5, right: 0.5}
        },
    })
    .on('dragmove', function (event) {
        var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

        pushPadLocUpdate(x, y);

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    });
}


prepSlides();
renderSlideUpdate();

// initPad();
initAllPadMarkers();
// centerPadMarker();

populatePadLocations();


// Utility Functions

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// var windowResized = debounce(function() {
// 	initPad();
// 	initPadMarker();
// }, 250);

// window.addEventListener('resize', windowResized);


function roundTo(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}