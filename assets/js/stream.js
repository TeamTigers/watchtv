$(function () {
  const categoryName = window.localStorage.getItem("categoryName");
  const channelData = JSON.parse(window.localStorage.getItem("channelData"));

  // set last 10 data
  setLast10Data(channelData);
  // Player
  const player = new Clappr.Player({
    parentId: "#player",
    source: channelData.url,
    autoPlay: true,
    poster: "assets/img/preview.jpg",
    plugins: [DashShakaPlayback],
    height: "600",
    width: "90vw",
  });

  let page = 1;
  buffer(categoryName, page);

  $(window).scroll(function () {
    let height = parseInt($(window).height() + $(window).scrollTop());
    height = Math.ceil(height);
    if ($(document).height() === height) {
      page += 1;
      buffer(categoryName, page);
    }
  });

  // Go Back location
  window.onpopstate = function () {
    history.go(history.length - 1);
  };
});

function buffer(category, page) {
  const DEFAULT_IMAGE = "assets/img/img.jpg";
  const apiUrl = `https://mini-js.herokuapp.com/mini/api/iptv?category=${category}&page=${page}`;
  const showToast = function (data, style) {
    M.toast({
      html: data,
      classes: style,
    });
  };

  $.get(apiUrl, function () {})
    .done((response) => {
      let channelCards = "";

      const generateChannelCards = function () {
        response.forEach(function (element, index) {
          channelCards = channelCards.concat(`
            <div class='col s6 m4 l3'>
              <div class='card commonClsList' id='${index}'>
                <div class='card-content center'>
                  <img src='${
                    element.logo === "null" ? DEFAULT_IMAGE : element.logo
                  }' alt='channel' style='width: 136px; height: 100px' class='responsive-img fixImg'/>
                  <p class='flow-text truncate'>${element.name}</p>
                </div>
              </div>
            </div>
          `);
        });
      };

      generateChannelCards();
      $("#streamChannelListID").append(channelCards);

      // set channel Data
      $(".commonClsList").click(function () {
        const id = this.id,
          data = JSON.stringify(response[id]);
        window.localStorage.setItem("channelData", data);
        window.location.replace("stream.html");
      });
    })
    .fail(function () {
      showToast("Something went wrong!", "red darken-3");
    });
}

function setLast10Data(channelData) {
  let top12Data = JSON.parse(window.localStorage.getItem("top12Data"));
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
