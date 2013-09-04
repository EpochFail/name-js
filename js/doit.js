var root_url = "http://localhost:5555";

var curr_word = "";
var starting_rating = 0;
var session_rating = 0;

var rating_div;
var name_div;

var upvote_button;
var downvote_button;

$(function() {
  $("#button").click(generateName);
	$(document).keyup(function(e) { if (e.keyCode == 32 || e.keyCode == 13) generateName(); });

	upvote_button = $("#up");
  downvote_button = $("#down");

  upvote_button.click({direction: "up"}, vote);
  downvote_button.click({direction: "down"}, vote);
  $(document).keyup(function(e) { if (e.keyCode == 38) upvote_button.click(); });
  $(document).keyup(function(e) { if (e.keyCode == 40) downvote_button.click(); });

  rating_div = $("#rating");
  name_div = $("#name");
});

function generateName() {
  $.getJSON(root_url + "/api/word", function(data) {
    curr_word = data.word;
    starting_rating = data.rating;
    session_rating = starting_rating;
    
    name_div.html(data.word + ".js");
    rating_div.html(starting_rating);
    
    votes.style.visibility = "visible";
		resetVoteImages();	
	});
}

var user_voted = false;
var user_voted_direction;

function vote(event) {
  if (curr_word === "") return;

  var direction = event.data.direction;
  
  if (direction === "up" && session_rating < starting_rating + 1) {
    session_rating++;
		upvote_button.attr("src", "img/upvote-pressed.png");
    updateVote(direction);
  }
  else if (direction === "down" && session_rating > starting_rating - 1) {
    session_rating--;
		downvote_button.attr("src", "img/downvote-pressed.png");
    updateVote(direction);
  }

	if (session_rating == starting_rating) resetVoteImages();
}

function updateVote(direction) {
  rating_div.html(session_rating);

  var _url = root_url + "/api/vote/" + curr_word + "/" + direction;
  $.ajax({
    url: _url
  });
}

function resetVoteImages() {
	upvote_button.attr("src", "img/upvote.png");
	downvote_button.attr("src", "img/downvote.png");
}
