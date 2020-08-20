$(function() {
  let channelURL = window.localStorage.getItem("channelURL");
  let player = new Clappr.Player({
    parentId: '#player',
    source: channelURL,
    autoPlay: true,
    poster: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e2318528-9366-46b2-844f-34513f3840cf/d3hhy78-99f49625-2abf-416a-86fb-8166aee9a2b3.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZTIzMTg1MjgtOTM2Ni00NmIyLTg0NGYtMzQ1MTNmMzg0MGNmXC9kM2hoeTc4LTk5ZjQ5NjI1LTJhYmYtNDE2YS04NmZiLTgxNjZhZWU5YTJiMy5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.D3KEfSGnwCXvYZZCeYDnNWXOn8zE1rFJ9A3HO0sv90A',
    plugins: [DashShakaPlayback],
    height: 600,
    width: 1080
  })

  // Go Back location
  window.onpopstate = function () {
    history.go(history.length - 1);
  };
})