$(function(){
  // Set Category List 
  let data = [
    "News", "Music", "Sport", "Movies",
    "Entertainment", "Comedy", "Documentary", 
    "Fashion", "History", "Kids"
  ];
  let str = "";
  data.forEach(el => {
    str += "<div class='col s6 m4 l3'>";
    str += "<div class='card commonCls' id='"+ el +"'>";
    str += "<div class='card-content center'>";
    str += "<span class='flow-text'>"+ el +"</span>";
    str += "</div></div></div>";
  });
  $("#categoryList").html(str);

  // show recent channels list
  setRecentData();

  // Redirect Page With Data
  $(".commonCls").click(function () {
    let id = this.id;
    window.localStorage.setItem("categoryName", id);
    window.location.replace("channelList.html");
  });

  // Store current location
  history.pushState(null, null, location.href);
});

function setRecentData() {
  let top12Data = window.localStorage.getItem("top12Data");
    top12Data = JSON.parse(top12Data);
  if (top12Data !== undefined && top12Data !== null && top12Data.length > 0) {
    let str = "<div class='section'>";
    str += "<div class='row'>";
    str += "<div class='col s12'>";
    str += "<h4 class='mid-white'>Recently watched</h4>";
    str += "<br />";
    for (let i = 0; i < top12Data.length; i++) {
      let imgUrl = top12Data[i].logo === "null" 
        ? "assets/img/img.jpg" : top12Data[i].logo;
      str += "<div class='col s6 m4 l3'>";
      str += "<div class='card commonClsList' id='" + i + "'>";
      str += "<div class='card-content center'>";
      str +=
        "<img src='" +
        imgUrl +
        "' alt='channel' style='width: 136px; height: 100px'";
      str += "class='responsive-img fixImg'/>";
      str += "<p class='flow-text truncate'>" + top12Data[i].name + "</p>";
      str += "</div></div></div>";
    }
    str += "</div></div></div>";
    $("#recent12ChannelsID").html(str);

    // set channel Data
    $(".commonClsList").click(function () {
      let id = this.id, data = JSON.stringify(top12Data[id]);
      window.localStorage.setItem("channelData", data);
      window.location.replace("stream.html");
    });
  }
}