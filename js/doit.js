var button = document.getElementById("button");

button.addEventListener("click", function() {
  var name = document.getElementById("name");
  
  var xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      obj = JSON.parse(xhr.responseText);
      name.innerHTML = obj.word + ".js";
    }
  };

  xhr.open('GET', 'https://tranquil-lowlands-2993.herokuapp.com/api/word', true);
  xhr.send(null);
}, false);

