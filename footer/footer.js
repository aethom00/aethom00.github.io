/* For Opening Links */
window.onload = function() {
    var links = document.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++) {
      if (/*!links[i].classList.contains("dropdown__link")*/ links[i].closest("footer") || links[i].id === "res") {
        links[i].addEventListener("click", function(event) {
          event.preventDefault();
          var confirmation = confirm("Are you sure you want to open this link?");
          if(confirmation == true) {
            window.open(this.href, '_blank');
          }
        });
      }
    }
  };

/* For removing part of footer element for mobile-view and restoring */

// Global variable to store the reference to the <p> element
var paragraphElement = null;

// Function to remove the <p> element from the footer and update styles
function removeParagraph() {
  var footer = document.querySelector('footer');
  var paragraph = footer.querySelector('p');
  if (paragraph) {
    paragraphElement = paragraph; // Store a reference to the <p> element
    paragraph.remove();

    footer.style.justifyContent = 'center'; // Update justify-content to center
  }
}

// Function to restore the <p> element in the center of the footer container and update styles
function restoreParagraph() {
  if (paragraphElement) {
    var footer = document.querySelector('footer');
    var siblingElement = footer.querySelector('.footer-right');
    footer.insertBefore(paragraphElement, siblingElement);
    paragraphElement = null; // Reset the reference to the <p> element
    footer.style.justifyContent = 'space-around'; // Update justify-content to space-around
  }
}

// Function to handle screen size changes
function handleScreenSizeChange(mediaQuery) {
  if (mediaQuery.matches) {
    removeParagraph();
  } else {
    restoreParagraph();
  }
}

// Add event listener for screen size changes
var mediaQuery = window.matchMedia('(max-width: 992px)');
mediaQuery.addListener(handleScreenSizeChange);
handleScreenSizeChange(mediaQuery); // Call the function initially