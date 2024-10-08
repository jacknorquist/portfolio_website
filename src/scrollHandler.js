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
    slideDiv = 'about'
  }else if (slide === 1){
    slideDiv = 'projects'
  }

  if (scrollDirection === 'up' && Math.abs(deltaY) > 100) {


    const div = document.querySelector('.' + slideDiv);
    if(div.classList.contains('active')){
    const canvas = document.getElementById('canvas');
    const header = document.querySelector('.header');
    div.classList.remove('active');
    canvas.classList.remove('transition');
    header.classList.remove('inactive')
    }

    // Delay resetting flag to allow for toggle completion
    setTimeout(() => {
      isToggling = false;
    }, 700); // Adjust as needed to match animation duration or toggle completion
  } else if (scrollDirection === 'down' && Math.abs(deltaY) > 100) {
    console.log('in class switch')
    const div = document.querySelector('.' + slideDiv);


      const canvas = document.getElementById('canvas');
      const header = document.querySelector('.header');
      div.classList.add('active');
      canvas.classList.add('transition')
      header.classList.add('inactive');

      // Delay resetting flag to allow for toggle completion

      setTimeout(() => {
        isToggling = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 550);

    } else {
    isToggling = false; // Reset flag if no significant scroll detected
  }
}

let touchStartX, touchStartY, touchEndX, touchEndY, touchStartTime, touchEndTime;
const swipeThreshold = 100;
const swipeVelocityThreshold = 1;

// Handle touch start event
function handleTouchStart(event) {
  const touch = event.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
  touchStartTime = event.timeStamp;
}

// Handle touch end event
function handleTouchEnd(event) {
  const touch = event.changedTouches[0];
  touchEndX = touch.clientX;
  touchEndY = touch.clientY;
  touchEndTime = event.timeStamp; // Record end time

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  const swipeDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY); // Total swipe distance
  const swipeTime = touchEndTime - touchStartTime; // Time taken for swipe
  const swipeVelocity = swipeDistance / swipeTime; // Velocity in pixels/ms


  // Check if swipe distance and velocity exceed thresholds
  if (Math.abs(deltaY) > Math.abs(deltaX) && swipeDistance > swipeThreshold && swipeVelocity > swipeVelocityThreshold) {
    console.log('Deliberate swipe detected, simulating wheel event');
    const simulatedEvent = { deltaY: deltaY > 0 ? -101 : 101 };
    handleWheel(simulatedEvent); // Simulate a wheel event
  }
}




export {handleWheel, handleTouchStart, handleTouchEnd}