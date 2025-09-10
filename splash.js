// Splash screen functionality
document.addEventListener('DOMContentLoaded', function() {
  // Configuration - you can change the image URL here
  const SPLASH_IMAGE_URL = 'https://difal35hjlwym.cloudfront.net/sbg-spash-nba-jam.png';
  const SPLASH_DURATION = 5000; // 5 seconds in milliseconds
  const FADE_DURATION = 2000; // 2 second fade duration
  
  // Create splash screen elements
  const splashScreen = document.createElement('div');
  splashScreen.id = 'splash-screen';
  
  const splashImage = document.createElement('img');
  splashImage.id = 'splash-image';
  splashImage.src = SPLASH_IMAGE_URL;
  splashImage.alt = 'Splash Screen';
  
  splashScreen.appendChild(splashImage);
  document.body.appendChild(splashScreen);
  
  // Wrap main content
  const mainContent = document.createElement('div');
  mainContent.id = 'main-content';
  
  // Move all existing body content except splash screen to main content
  const bodyChildren = Array.from(document.body.children);
  bodyChildren.forEach(child => {
    if (child.id !== 'splash-screen') {
      mainContent.appendChild(child);
    }
  });
  
  document.body.appendChild(mainContent);
  
  // Handle image load error
  splashImage.onerror = function() {
    console.warn('Splash image failed to load, skipping splash screen');
    skipSplash();
  };
  
  // Handle image load success
  splashImage.onload = function() {
    // Start the splash sequence
    setTimeout(() => {
      startFadeOut();
    }, SPLASH_DURATION);
  };
  
  // If image doesn't load within 2 seconds, skip splash
  setTimeout(() => {
    if (!splashImage.complete) {
      skipSplash();
    }
  }, 2000);
  
  function startFadeOut() {
    splashScreen.classList.add('fade-out');
    mainContent.classList.add('show');
    
    setTimeout(() => {
      splashScreen.classList.add('hidden');
    }, FADE_DURATION);
  }
  
  function skipSplash() {
    splashScreen.classList.add('hidden');
    mainContent.classList.add('show');
  }
  
  // Allow skipping splash by pressing any key or clicking
  document.addEventListener('keydown', skipSplash);
  document.addEventListener('click', skipSplash);
});