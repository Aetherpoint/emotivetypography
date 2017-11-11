

var slideData = [
  { 
    "imageFileName" :  "url"
  },
  { 
    "imageFileName" :  "url"
  },
  { 
    "imageFileName" :  "url"
  },
  { 
    "imageFileName" :  "url"
  },
  { 
    "imageFileName" :  "url"
  },
  { 
    "imageFileName" :  "url"
  },
  { 
    "imageFileName" :  "url"
  },
  { 
    "imageFileName" :  "url"
  }
];

var slideHTMLGroup = [];


// <div class='subsection'>
//           <h1>Image ` + (i) + ` of ` + slideData.length + `</h1>
//           <p>Look at the image on the right. Drag the marker closest to how it makes you feel.</p>
//         </div>


addImageSlides(slideData);

function addImageSlides (slideData) {
	var prelimSlide = document.getElementsByClassName('preliminary-slide');
  const slideStartingIndex = 2;


  for (var i = 0; i <= slideData.length; i++) {

    var indexNum = i;

    var currentHTMLString = `<div id='slide` + (indexNum + slideStartingIndex) + `' class='container img-` + (i) + `'>` +
      `<section class='left'>
        <div class='subsection'>
          <h1>Image ` + (i) + ` of ` + slideData.length + `</h1>
          <p>Look at the image on the right. Drag the marker closest to how it makes you feel.</p>
        </div>

        <div class='subsection subsection-middle'>
          <div class='pad'>
            <div class='label-vertical'>
              <div class='y1'>Activated</div>
              <div class='y2'>Deactivated</div>
            </div>
            <div class='sub-label'>

              <div class='row'>
                <div class='y1'><span>Tense</span></div>
                <div class='y1'><span>Alert</span></div>
              </div>

              <div class='row'>
                <div class='y1'><span>Nervous</span></div>
                <div class='y1'><span>Excited</span></div>
              </div>

              <div class='row'>
                <div class='y1'><span>Stressed</span></div>
                <div class='y1'><span>Enthusiastic</span></div>
              </div>

              <div class='row'>
                <div class='y1'><span>Upset</span></div>
                <div class='y1'><span>Happy</span></div>
              </div>

              <div class='row'>
                <div></div>
                <div></div>
              </div>

              <div class='row'>
                <div class='y1'><span>Sad</span></div>
                <div class='y1'><span>Contented</span></div>
              </div>

              <div class='row'>
                <div class='y1'><span>Depressed</span></div>
                <div class='y1'><span>Serene</span></div>
              </div>

              <div class='row'>
                <div class='y1'><span>Sluggish</span></div>
                <div class='y1'><span>Relaxed</span></div>
              </div>

              <div class='row'>
                <div class='y1'><span>Bored</span></div>
                <div class='y1'><span>Calm</span></div>
              </div>
            </div>
            <div class='grid-vertical'>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
            </div>
            <div class='label-horizontal'>
              <div class='x1'>Unpleasant</div>
              <div class='x2'>Pleasant</div>
            </div>
            <div class='grid-horizontal'>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
              <div class='line'></div>
            </div>

            <div id='grid-snap' class='marker' data-x='30' data-y='30'></div>
          </div>
        </div>

        <div class='subsection subsection-nav'>
          <div class='button button-left'>Previous</div>
          <div class='button button-right'>Next</div>
        </div>
      </section>

      <section class='right'>
        <div class='subsection'>

        </div>
      </section>
    </div>`

    slideHTMLGroup.push(currentHTMLString);
  }


	if (prelimSlide[0]) {
		// Traverse opposite down the list and populate each slide
		for (var i = slideData.length; i > 0; i--) {

			console.log("Adding slide");

			prelimSlide[0].insertAdjacentHTML('afterend', slideHTMLGroup[i]);
		}
	}
	else {
		console.log("No place to add slides");
	}
}


