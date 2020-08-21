$(function () {
  let categoryName = window.localStorage.getItem("categoryName");
  let channelData = window.localStorage.getItem("channelData");
  channelData = JSON.parse(channelData);
  // set last 10 data
  setLast10Data(channelData);
  // Player
  let player = new Clappr.Player({
    parentId: "#player",
    source: channelData.url,
    autoPlay: true,
    poster: "assets/img/preview.jpg",
    plugins: [DashShakaPlayback],
    height: "600",
    width: "90vw",
  });

  let page = 1;
  dataLoadFromAPI(categoryName, page);

  $(window).scroll(function() {
    let height = parseInt($(window).height() + $(window).scrollTop());
      height = Math.ceil(height);
    if ($(document).height() === height) {
      page += 1;
      dataLoadFromAPI(categoryName, page);
    }
  });

  // Go Back location
  window.onpopstate = function () {
    history.go(history.length - 1);
  };
});

function dataLoadFromAPI(categoryName, page) {
  let apiURL = "https://mini-js.herokuapp.com/mini/api/iptv?category=";
  apiURL += categoryName + "&page=" + page;
  $.get(apiURL, function () {})
    .done((res) => {
      let str = "";
      for (let i = 0; i < res.length; i++) {
        let imgUrl = res[i].logo === "null" ? "assets/img/img.jpg" : res[i].logo;
        str += "<div class='col s6 m4 l3'>";
        str += "<div class='card commonClsList' id='" + i + "'>";
        str += "<div class='card-content center'>";
        str +=
          "<img src='" +
          imgUrl +
          "' alt='channel' style='width: 136px; height: 100px'";
        str += "class='responsive-img fixImg'/>";
        str += "<p class='flow-text truncate'>" + res[i].name + "</p>";
        str += "</div></div></div>";
      }
      $("#streamChannelListID").append(str);;

      // set channel Data
      $(".commonClsList").click(function () {
        let id = this.id, data = JSON.stringify(res[id]);
        window.localStorage.setItem("channelData", data);
        window.location.replace("stream.html");
      });
    })
    .fail(function () {
      showToast("Something went wrong!", "red darken-3");
    });
}

function setLast10Data(channelData) {
  let top12Data = window.localStorage.getItem("top12Data");
  top12Data = JSON.parse(top12Data);

  let check = true;
  if (top12Data === undefined || top12Data === null || top12Data.length === 0) {
    top12Data = [];
  } else {
    for (let i = 0; i < top12Data.length; i++) {
      if (top12Data[i].url === channelData.url) {
        check = false;
        break;
      }
    }
  }
  if (check === true) {
    if (top12Data.length >= 12) {
      settop12Data = top12Data.shift();
    }
    top12Data.push(channelData);
  }
  top12Data = JSON.stringify(top12Data);
  window.localStorage.setItem("top12Data", top12Data);
}