$(function(){
  window.localStorage.clear();

  // Set Category List 
  let data = [
    "Comedy", "Documentary", "Entertainment", 
    "Fashion", "History", "Kids", "Movies", 
    "Music", "News", "Sport"
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

  // Redirect Page With Data
  $(".commonCls").click(function () {
    let id = this.id;
    console.log(id);
    window.localStorage.setItem("categoryName", id);
    window.location.replace("channelList.html");
  });

  
});