var root_url = "http://localhost:5555";

var curr_word = "";
var curr_rating = 0;

var rating_div;
var name_div;

$(function() {
  $("#button").click(displayJson);
	$(document).keydown(function(e) { if (e.keyCode == 32) displayJson(); });

  $("#up").click({direction: "up"}, vote);
  $("#down").click({direction: "down"}, vote);

  rating_div = $("#rating");
  name_div = $("#name");
});

function displayJson() {
  $.getJSON(root_url + "/api/word", function(data) {
    curr_word = data.word;
    curr_rating = data.rating;
    
    name_div.html(data.word + ".js");
    rating_div.html(curr_rating);
    
    votes.style.visibility = "visible";
  });
}

function vote(event) {
  if (curr_word === "") return;

  var direction = event.data.direction;
  
  if (direction === "up") curr_rating++;
  else if (direction === "down") curr_rating--;

  rating_div.html(curr_rating);

  var _url = root_url + "/api/vote/" + curr_word + "/" + direction;
  $.ajax({
    url: _url
  });
}
