$(function() {
  namejs.app.init();	
});

var namejs = namejs || {};

namejs.app = {
	root_url: "http://localhost:5555",
	curr_word: "",
  starting_rating: 0,
  session_rating: 0,

  rating_div: null,
  name_div: null,

  upvote_button: null,
  downvote_button: null,
  history_div: null,
  top10_div: null,
  bottom10_div: null,

	init: function() {
    var alias = namejs.app;

    with (alias) {
			upvote_button = $("#up");
			downvote_button = $("#down");
			rating_div = $("#rating");
			name_div = $("#name");
			history_div = $("#history");
			top10_div = $("#top10");
			bottom10_div = $("#bottom10");
		};

		$("#button").click(alias.generateName);
		$(document).keyup(function(e) { if (e.keyCode == 32 || e.keyCode == 13) alias.generateName(); });
		
		alias.upvote_button.click({direction: "up"}, alias.vote);
		alias.downvote_button.click({direction: "down"}, alias.vote);
		$(document).keyup(function(e) { if (e.keyCode == 38) alias.upvote_button.click(); });
		$(document).keyup(function(e) { if (e.keyCode == 40) alias.downvote_button.click(); });
		
		alias.buildHistory();
		alias.buildTop10();
		alias.buildBottom10();

		setInterval(alias.buildHistory, 30000);
    setInterval(alias.buildTop10, 60000);
    setInterval(alias.buildBottom10, 60000);
	},

	generateName: function() {
    var alias = namejs.app;	
    $.getJSON(alias.root_url + "/api/word", function(data) {
      with(alias) {
        curr_word = data.Word;
        starting_rating = data.Rating;
			  session_rating = alias.starting_rating;
			
        name_div.html(alias.curr_word	+ ".js");
			  rating_div.html(alias.starting_rating);
    
			  resetVoteImages();
      }
      votes.style.visibility = "visible";
    });
	},

  vote: function(event) {
    var alias = namejs.app;
    if (alias.curr_word === "") return;

    var direction = event.data.direction;
  
    if (direction === "up" && alias.session_rating < alias.starting_rating + 1) {
      alias.session_rating++;
		  alias.upvote_button.attr("src", "img/upvote-pressed.png");
      alias.updateVote(direction);
    }
    else if (direction === "down" && alias.session_rating > alias.starting_rating - 1) {
      alias.session_rating--;
		  alias.downvote_button.attr("src", "img/downvote-pressed.png");
      alias.updateVote(direction);
    }  

	  if (alias.session_rating == alias.starting_rating) alias.resetVoteImages();
  },
  
  updateVote: function(direction) {
    var alias = namejs.app;
    alias.rating_div.html(alias.session_rating);

    var _url = alias.root_url + "/api/vote/" + alias.curr_word + "/" + direction;
    $.ajax({
      url: _url
    });
  },

  resetVoteImages: function() {
	  namejs.app.upvote_button.attr("src", "img/upvote.png");
	  namejs.app.downvote_button.attr("src", "img/downvote.png");
  },

  buildHistory: function() {
    var alias = namejs.app;
    var $loader = $("#last-loader");
   
    $loader.show();
    $.getJSON(alias.root_url + "/api/history", function(data) {
		  alias.history_div.html("");

		  for (var i = 0; i < data.length; i++) {
			  alias.history_div.append("<li>" + data[i].Rating + " " + data[i].Word + ".js</li>");
		  }
      $loader.hide();
    });
  },
  
  buildTop10: function() {
    var alias = namejs.app;
    var $loader = $("#best-loader");

    $loader.show();
    $.getJSON(alias.root_url + "/api/top10", function(data) {
		  alias.top10_div.html("");

		  for (var i = 0; i < data.length; i++) {
			  alias.top10_div.append("<li>" + data[i].Rating + " " + data[i].Word + ".js</li>");
		  }
      $loader.hide();
    });
  },
  
  buildBottom10: function() {
    var alias = namejs.app;
    var $loader = $("#worst-loader");

    $loader.show();
    $.getJSON(alias.root_url + "/api/bottom10", function(data) {
		  alias.bottom10_div.html("");

		  for (var i = 0; i < data.length; i++) {
			  alias.bottom10_div.append("<li>" + data[i].Rating + " " + data[i].Word + ".js</li>");
		  }
      $loader.hide();
    });
  }
}
