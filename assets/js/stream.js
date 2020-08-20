$(function() {
  // Go Back location
  window.onpopstate = function () {
    history.go(history.length - 1);
  };
})