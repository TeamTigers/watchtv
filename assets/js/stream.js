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

  let categoryName = window.localStorage.getItem("categoryName");
  let apiURL = "https://mini-js.herokuapp.com/mini/api/iptv?category=";
  apiURL += categoryName;
  $.get(apiURL, function () {})
    .done((res) => {
      let str = "";
      res.forEach((el) => {
        let imgUrl = el.logo === "null" ? "assets/img/img.jpg" : el.logo;
        str += "<div class='col s6 m4 l3'>";
        str += "<div class='card commonClsList' id='" + el.url + "'>";
        str += "<div class='card-content center'>";
        str +=
          "<img src='" +
          imgUrl +
          "' alt='channel' style='width: 136px; height: 100px'";
        str += "class='responsive-img fixImg'/>";
        str += "<p class='flow-text truncate'>" + el.name + "</p>";
        str += "</div></div></div>";
      });
      $("#streamChannelListID").html(str);
      
      // set channel Data
      $(".commonClsList").click(function () {
        let id = this.id;
        window.localStorage.setItem("channelURL", id);
        window.location.replace("stream.html");
      });
    })
    .fail(function () {
      showToast("Something went wrong!", "red darken-3");
    });

  // Go Back location
  window.onpopstate = function () {
    history.go(history.length - 1);
  };
});
