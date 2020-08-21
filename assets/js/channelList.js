$(function () {
  let categoryName = window.localStorage.getItem("categoryName");
  $("#channelNameID").html(categoryName);

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
    window.location.replace("index.html");
  };
  // Store current location
  history.pushState(null, null, location.href);
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
      $("#channelListID").append(str);

      $(".loading-bar").hide();
      $(".main-content").fadeIn();

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

/*** Show Toast ***/
function showToast(data, style) {
  M.toast({
    html: data,
    classes: style,
  });
}
