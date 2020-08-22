$(function () {
  const categoryName = window.localStorage.getItem("categoryName");
  $("#channelNameID").html(categoryName);

  let page = 1;
  loadChannels(categoryName, page);

  $(window).scroll(function () {
    const height = Math.ceil(
      parseInt($(window).height() + $(window).scrollTop())
    );

    if ($(document).height() === height) {
      page += 1;
      loadChannels(categoryName, page);
    }
  });

  // Go Back location
  window.onpopstate = function () {
    window.location.replace("index.html");
  };
  // Store current location
  history.pushState(null, null, location.href);
});

function loadChannels(category, page) {
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
      $("#channelListID").append(channelCards);
      $(".loading-bar").hide();
      $(".main-content").fadeIn();

      // set channel Data
      $(".commonClsList").click(function () {
        let id = this.id,
          data = JSON.stringify(response[id]);
        window.localStorage.setItem("channelData", data);
        window.location.replace("stream.html");
      });
    })
    .fail(function () {
      showToast("Something went wrong!", "red darken-3");
    });
}
