
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

		console.log(i);
		
		// Attack event listeners to the slide buttons

		// If the slide has a button to advance, then add an event listener
		if (slides[i].querySelectorAll('.button-left')[0]) {
			// slides[i].querySelectorAll('.button-left')

			console.log(slides[i].querySelectorAll('.button-left')[0]);

			slides[i].querySelectorAll('.button-left')[0].addEventListener("click", function(event) {
			    
			    console.log("Hit Left");
			    backupSlide();
			});
		}
		if (slides[i].querySelectorAll('.button-right')[0]) {

			console.log(slides[i].querySelectorAll('.button-right')[0]);

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

	console.log(padWidth, padHeight);
}


function dividePadGrid(axis) {

	if ((padWidth !== 0) || (padWidth !== 0)) {
		if (axis === "x") {
			return padWidth / 10;
		}
		else if (axis === "y") {
			return padHeight / 10;
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
	        interact.createSnapGrid({ x: dividePadGrid("x"), y: dividePadGrid("y") })
	      ],
	      range: Infinity,
	      relativePoints: [ { x: 0, y: 0 } ]
	    },
	    inertia: true,
	    restrict: {
	      restriction: element.parentNode,
	      elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
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