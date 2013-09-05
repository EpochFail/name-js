var root_url = "http://localhost:5555";

var curr_word = "";
var starting_rating = 0;
var session_rating = 0;

var rating_div;
var name_div;

var upvote_button;
var downvote_button;
var history_div;
var top10_div;
var bottom10_div;

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
	history_div = $("#history");
	top10_div = $("#top10");
	bottom10_div = $("#bottom10");

	buildStats();

	setInterval(buildStats, 30000); 
});

function generateName() {
  $.getJSON(root_url + "/api/word", function(data) {
    curr_word = data.Word;
    starting_rating = data.Rating;
    session_rating = starting_rating;
    
    name_div.html(curr_word	+ ".js");
    rating_div.html(starting_rating);
    
    votes.style.visibility = "visible";
		resetVoteImages();	
	});
}

function buildStats() {
	$.getJSON(root_url + "/api/stats", function(data) {
		var history = data.History;
		var top10 = data.Top10;
		var bottom10 = data.Bottom10;

		history_div.html("");
		top10_div.html("");
		bottom10_div.html("");		

		for (var i = 0; i < history.length; i++) {
			history_div.append("<li>" + history[i].Rating + " " + history[i].Word + ".js</li>");
		}
		
		for (var i = 0; i < top10.length; i++) {
			top10_div.append("<li>" + top10[i].Rating + " " + top10[i].Word + ".js</li>");
		}
	
		for (var i = 0; i < bottom10.length; i++) {
			bottom10_div.append("<li>" + bottom10[i].Rating + " " + bottom10[i].Word + ".js</li>");
		}	
	});
}

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
