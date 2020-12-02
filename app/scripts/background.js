// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'


chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create('../pages/index.html', {
      'bounds': {
          'width' : 300,
          'height': 400,
          'top' : 0,
          'left': 0
      }
  });
});
