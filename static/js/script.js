// Select DOM elements
const circle = document.getElementById('circle');
const ripple = document.getElementById('ripple');
const sound = document.getElementById('sound');
const switchElement = document.getElementById('switch');
let buttonDisabled = false;
let isAnimating = false; // Flag to track animation state

// Function to trigger animation and sound
function triggerAnimationAndSound() {
    console.log("Triggering animation and sound...");
    if (!isAnimating) {
        isAnimating = true;  // Set flag to true to indicate animation in progress
        circle.classList.add('animate'); // Add animation class to the circle
        ripple.classList.add('active');  // Add active class to the ripple effect
        sound.play();  // Play the sound

        // Reset animations after completion
        setTimeout(() => {
            circle.classList.remove('animate');
            ripple.classList.remove('active');
            isAnimating = false;  // Reset the flag after the animation completes
        }, 800);  // Matches the ripple animation duration
    }
}

// Create a WebSocket connection to the Flask server
const socket = io.connect('http://192.168.1.102:5000');  // Adjust the URL to match your Flask server

// Listen for the trigger event from the server
socket.on('trigger_animation', function () {
    console.log("Received trigger from Flask via WebSocket");

    // Only trigger animation if the button is not disabled
    if (!buttonDisabled) {
        triggerAnimationAndSound();  // Trigger animation and sound when Flask sends the event
    } else {
        console.log("Button is disabled, animation not triggered.");
    }
});

// Listen for the switch toggle and enable/disable the button
switchElement.addEventListener('change', function () {
    if (switchElement.checked) {
        buttonDisabled = false;  // Enable the button
        circle.style.backgroundColor = '#59D7F3';  // Restore button color
    } else {
        buttonDisabled = true;  // Disable the button
        circle.style.backgroundColor = '#ddd';  // Grey out the button
    }
});