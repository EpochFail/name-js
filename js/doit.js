$(function() {
  $("#button").click(displayJson);
	$(document).keydown(function(e) { if (e.keyCode == 32) displayJson(); });

	function displayJson() {
    $.getJSON("https://tranquil-lowlands-2993.herokuapp.com/api/word", function(data) {
      $("#name").html(data.word + ".js");
    });
	}
});

