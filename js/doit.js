var name_button = document.getElementById("button");
var curr_word = "";
var curr_rating = 0;

name_button.addEventListener("click", function() {
  var name = document.getElementById("name");
  var rating = document.getElementById("rating");

  var xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      obj = JSON.parse(xhr.responseText);
      
      curr_word = obj.word;
      curr_rating = obj.rating;
      name.innerHTML = curr_word + ".js";
      rating.innerHTML = curr_rating;;
    }
  };

  xhr.open('GET', 'http://localhost:5555/api/word', true);
  xhr.send(null);
}, false);

var up_button = document.getElementById("up");
var down_button = document.getElementById("down");

up_button.addEventListener("click", function() {
  if (curr_word === "") return;
 
  curr_rating++;
  rating.innerHTML = curr_rating;

  var xhr = new XMLHttpRequest();
  var url = "http://localhost:5555/api/vote/" + curr_word + "/up";
  
  xhr.open('GET', url, true);
  xhr.send(null);
  
}, false);

down_button.addEventListener("click", function() {
  if (curr_word === "") return;
  
  curr_rating--;
  rating.innerHTML = curr_rating;
  
  var xhr = new XMLHttpRequest();
  var url = "http://localhost:5555/api/vote/" + curr_word + "/down";
  
  xhr.open('GET', url, true);
  xhr.send(null);
}, false);

