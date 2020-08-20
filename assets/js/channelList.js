$(function() {
  let categoryName = window.localStorage.getItem("categoryName");
  let apiURL = "https://mini-js.herokuapp.com/mini/api/iptv?category=" 
    apiURL += categoryName;
  $.get(apiURL, function() {})
    .done((res) => {
      let str = "";
      res.forEach(el => {
        str += "<div class='col s6 m4 l3'>";
        str += "<a href='stream.html'>";
        str += "<div class='card'>";
        str += "<div class='card-content center'>";
        str += "<img src='"+ el.logo +"' alt='channel'";
        str += "class='responsive-img fixImg'/>"
        str += "<p class='flow-text truncate'>"+ el.name +"</p>"
        str += "</div></div></a></div>"
        console.log(el.url)
      });
      $("#channelListID").html(str);
    })
    .fail(function() {
      showToast("Somthing problem here!!!", "red darken-3");
    });

  // Go Back location
  window.onpopstate = function () {
    window.location.replace("index.html");
  };
  // Store current location
  history.pushState(null, null, location.href);
});

 

/*** Show Toast ***/
function showToast(data, style) {
  M.toast({
      html : data,
      classes : style
  });
}