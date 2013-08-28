window.onload = function() {
  var button = document.getElementById("button");

  button.addEventListener("click", function() {
    var noun = nouns[Math.floor(Math.random() * nouns.length)];

    var name = document.getElementById("name");
    name.innerHTML = noun + ".js"; 
  }, false);
};

var nouns = [
  "pants",
  "polio",
  "taco",
  "burrito",
  "table",
  "platypus",
  "boat",
  "rake",
  "toe",
  "finger",
  "walrus",
  "pancake",
  "waffle",
  "soda",
  "pan",
  "toaster",
  "chin",
  "building",
  "plant",
  "shirt",
  "poliomyelitis",
  "cancer",
  "tumor",
  "noggin",
  "stick",
  "rainbow",
  "lollypop",
  "pork",
  "pig",
  "ham",
  "corn",
  "shiv",
  "shank",
  "steve",
  "tony",
  "bilbo",
  "sally",
  "chicken",
  "island",
  "stone",
  "pickle",
  "pigeon",
  "stye",
  "mungo",
  "mango",
  "totem",
  "park",
  "street",
  "lamp",
  "road",
  "boardwalk",
  "shark",
  "pasta",
  "keyboard",
  "sword",
  "tongue",
  "car",
  "van"
];
