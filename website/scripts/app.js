
var currentSlide = 0;

function manageSlideState() {

}

function advanceSlide() {
	currentSlide++;
}
function backupSlide() {
	currentSlide--;
}


function hideSlide(slideElement) {
	slideElement.style.display = "none";
}
function showSlide(slideElement) {
	slideElement.style.display = "flex";
}


// Get the slides ready for transitioning
function prepSlides() {
	var sliderComponent = document.getElementById('slide-container');
	var slides = sliderComponent.querySelectorAll("#slide-container > div");

	for (var i = 0; i < slides.length; i++) {
		
		
		// Hide and show the current slide
		if (i === currentSlide) {
			showSlide(slides[i]);
		}
		else {
			hideSlide(slides[i]);
		}

		// Attack event listeners to the slide buttons

		// If the slide has a button to advance, then add an event listener
		if (slides[i].querySelectorAll('.button-left')[0]) {
			// slides[i].querySelectorAll('.button-left')

			slides[i].querySelectorAll('.button-left')[0].addEventListener("click", function(event) {
			    //do something

			    console.log("HEYYYY");
			});

			console.log(slides[i].querySelectorAll('.button-left')[0]);
		}
		else if (slides[i].querySelectorAll('.button-right')[0]) {

			slides[i].querySelectorAll('.button-right')[0].addEventListener("click", function(event) {
			    //do something

			    console.log("HEYYYY");
			});
		}


		// console.log(slides[i].querySelectorAll('.button-right'));
		// slides[i].style.display = "flex";
	}


	
}


prepSlides();