import { slide } from "./text";

let isToggling = false; // Flag to track toggle state

// Function to handle wheel event
function handleWheel(event) {
  if (isToggling) return; // Exit early if toggle is already in progress
  isToggling = true; // Set flag to true to prevent multiple toggles

  // Determine scroll direction using deltaY
  const deltaY = event.deltaY;
  const scrollDirection = deltaY < 0 ? 'up' : 'down';
  let slideDiv
  if(slide=== 0){
    slideDiv = 'home'
  }else if (slide === 1){
    slideDiv = 'about'
  }else if(slide === 2){
    slideDiv = 'projects'
  }

  if (scrollDirection === 'up' && Math.abs(deltaY) > 100) {

    const div = document.querySelector('.' + slideDiv);
    div.classList.remove('active');
    const canvas = document.getElementById('canvas');
    canvas.classList.remove('transition')

    // Delay resetting flag to allow for toggle completion
    setTimeout(() => {
      isToggling = false;
    }, 700); // Adjust as needed to match animation duration or toggle completion
  } else if (scrollDirection === 'down' && Math.abs(deltaY) > 100) {
    const div = document.querySelector('.' + slideDiv);
    div.classList.add('active');
    const canvas = document.getElementById('canvas');
    canvas.classList.add('transition')

    // Delay resetting flag to allow for toggle completion
    setTimeout(() => {
      isToggling = false;
    }, 700); // Adjust as needed to match animation duration or toggle completion
  } else {
    isToggling = false; // Reset flag if no significant scroll detected
  }
}

export {handleWheel}