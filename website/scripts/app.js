
var currentSlide = 0;

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

prepSlides();
updateSlides();