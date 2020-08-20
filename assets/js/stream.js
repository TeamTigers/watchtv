$(function () {
  let channelURL = window.localStorage.getItem("channelURL");
  let player = new Clappr.Player({
    parentId: "#player",
    source: channelURL,
    autoPlay: true,
    poster: "assets/img/preview.jpg",
    plugins: [DashShakaPlayback],
    height: "600",
    width: "90vw",
  });

  // Go Back location
  window.onpopstate = function () {
    history.go(history.length - 1);
  };
});
