
var currentSlide = 1;

function manageSlideState() {

}

function advanceSlide() {
	currentSlide++;
	updateSlides();
}
function backupSlide() {
	currentSlide--;
	updateSlides();
}


function hideSlide(slideElement) {

	// console.log("Hiding " + slideElement);
	slideElement.style.display = "none";
}

function showSlide(slideElement) {

	// console.log("Showing " + slideElement);
	slideElement.style.display = "flex";
}

// Update the slides
function updateSlides() {
	var sliderComponent = document.getElementById('slide-container');
	var slides = sliderComponent.querySelectorAll("#slide-container > div");

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
			    
			    console.log("Hit Left");
			    backupSlide();
			});
		}
		if (slides[i].querySelectorAll('.button-right')[0]) {

			// console.log(slides[i].querySelectorAll('.button-right')[0]);

			slides[i].querySelectorAll('.button-right')[0].addEventListener("click", function(event) {
			    
				console.log("Hit Right");
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

	if ((padWidth !== 0) || (padWidth !== 0)) {
		if (axis === "x") {

			console.log(roundTo((padWidth / 10), 2));
			return roundTo((padWidth / 10), 2);
		}
		else if (axis === "y") {

			console.log(roundTo((padHeight / 10), 2));
			return roundTo((padHeight / 10), 2);
		}
		else {
			console.log("No axis provided for the pad, please pass an 'x' or a 'y'");
		}
	}
	else {
		console.log("Pad width and height are 0, we need space to subdivide them.");
	}
}


function initPadMarker () {
	var element = document.getElementById('grid-snap'),
    x = 0, y = 0;

	interact(element)
	  .draggable({
	    snap: {
	      targets: [
	        interact.createSnapGrid({ x: (dividePadGrid("x")), y: (dividePadGrid("y")) })
	      ],
	      range: Infinity,
	      relativePoints: [ { x: 0, y: 0 } ],
	      offset: { x: 0, y: 0 }
	    },
	    inertia: true,
	    restrict: {
	      restriction: element.parentNode,
	      elementRect: { top: 0.5, left: 0.5, bottom: 0.5, right: 0.5 },
	      endOnly: true
	    }
	  })
	  .on('dragmove', function (event) {
	    x += event.dx;
	    y += event.dy;

	    event.target.style.webkitTransform =
	    event.target.style.transform =
	        'translate(' + x + 'px, ' + y + 'px)';
	  });
}



prepSlides();
updateSlides();

initPad();
initPadMarker();


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

var windowResized = debounce(function() {
	// initPad();
	// initPadMarker();
}, 250);

window.addEventListener('resize', windowResized);


function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
        if( n < 0) {
        negative = true;
      n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if( negative ) {    
        n = (n * -1).toFixed(2);
    }
    return n;
}