$(function () {
  // assign compile time constants
  const CATEGORIES = [
    "News", "Music", "Sport", "Movies", "Entertainment", 
    "Comedy", "Documentary", "Fashion", "History", "Kids",
  ];
  const DEFAULT_IMAGE = "assets/img/img.jpg";

  // instantiate run-time constants
  const recentlyViewed = JSON.parse(window.localStorage.getItem("top12Data"));

  // declare variables
  let categoryCards = "";
  let cachedCards = "";

  // display category wise cards
  const getCategoryCard = function (tag) {
    return `
      <div class='col s6 m4 l3'>
        <div class='card commonCls' id='${tag}'>
          <div class='card-content center'>
            <span class='flow-text'>${tag}</span>
          </div>
        </div>
      </div>
    `;
  };

  CATEGORIES.forEach((elem) => {
    categoryCards = categoryCards.concat(getCategoryCard(elem));
  });

  $("#categoryList").html(categoryCards);

  // display recent channels list

  const setCachedCards = function () {
    recentlyViewed.reverse().forEach(function (elem, index) {
      cachedCards = cachedCards.concat(`
        <div class='col s6 m4 l3'>
          <div class='card commonClsList' id='${index}'>
            <div class='card-content center'>
              <img src='${
                elem.logo === "null" ? DEFAULT_IMAGE : elem.logo
              }' alt='channel' style='width: 136px; height: 100px' class='responsive-img fixImg'/>
              <p class='flow-text truncate'> ${elem.name} </p>
            </div>
          </div>
        </div>
      `);
    });
  };

  const getCachedCards = function () {
    return `
      <div class='section'>
        <div class='row'>
          <div class='col s12'>
            <h4 class='mid-white'>Recently watched</h4><br />
            ${cachedCards}  
          </div>
        </div>
      </div>
    `;
  };

  if (recentlyViewed != null) {
    setCachedCards();
    $("#recent12ChannelsID").html(getCachedCards());

    $(".commonClsList").click(function () {
      const id = this.id,
        data = JSON.stringify(recentlyViewed[id]);
      window.localStorage.setItem("channelData", data);
      window.location.replace("stream.html");
    });
  }

  // redirect Page With Data
  $(".commonCls").click(function () {
    const id = this.id;
    window.localStorage.setItem("categoryName", id);
    window.location.replace("channelList.html");
  });

  // Store current location
  history.pushState(null, null, location.href);
});
