//Set variables for list of allowable queries
var breedList = ["affenpinscher", "afghan hound", "airedale terrier", "akita", "alaskan malamute", "american cocker spaniel", "american eskimo", "miniature american eskimo", "standard american eskimo", "toy american eskimo", "american foxhound", "american staffordshire terrier", "american water spaniel", "anatolian shepherd", "australian cattle dog", "australian shepherd", "australian terrier", "basenji", "basset hound", "beagle", "bearded collie", "beauceron", "bedlington terrier", "belgian malinois", "belgian sheepdog", "belgian tervuren", "bernese mountain dog", "bichon frise", "black and tan coonhound", "black russian terrier", "bloodhound", "border collie", "border terrier", "borzoi", "boston terrier", "bouvier des flandres", "boxer", "briard", "brittany", "brussels griffon", "bull terrier", "bulldog", "bullmastiff", "cairn terrier", "canaan dog", "cardigan welsh corgi", "cavalier king charles spaniel", "chesapeake bay retriever", "chihuahua", "chinese crested", "chinese shar-pei", "chow chow", "clumber spaniel", "collie", "curly-coated retriever", "miniature dachshund","dachshund", "dog", "doggo", "standard dachshund", "dalmatian", "dandie dinmont terrier", "doberman pinscher","doberman", "english cocker spaniel", "cocker spaniel", "foxhound","english foxhound", "english setter", "english springer spaniel", "english toy spaniel", "field spaniel", "finnish spitz", "flat-coated retriever", "french bulldog", "german pinscher", "german shepherd", "german shorthaired pointer", "german wirehaired pointer", "giant schnauzer", "glen of imaal terrier", "golden retriever", "gordon setter", "great dane", "great pyrenees", "greater swiss mountain dog", "greyhound", "harrier", "havanese", "ibizan hound", "irish setter", "irish terrier", "irish water spaniel", "irish wolfhound", "italian greyhound", "japanese chin", "keeshond", "kerry blue terrier", "komondor", "kuvasz", "labrador retriever", "lakeland terrier", "lhasa apso", "lowchen", "maltese", "standard manchester terrier","manchester terrier", "toy manchester terrier", "mastiff", "miniature bull terrier", "miniature pinscher", "miniature schnauzer", "mutt", "neapolitan mastiff", "newfoundland", "norfolk terrier", "norwegian elkhound", "norwich terrier", "nova scotia duck tolling retriever", "old english sheepdog", "otterhound", "papillon", "parson russell terrier", "pekingese", "pembroke welsh corgi", "petit basset griffon vendeen", "pharaoh hound", "plott", "pointer", "polish lowland sheepdog", "pomeranian", "miniature poodle","poodle", "standard poodle","french poodle", "toy poodle", "portuguese water dog", "pug", "puggle", "puli", "puppy", "redbone coonhound", "rhodesian ridgeback", "rottweiler", "saint bernard", "saluki","gazelle hound", "samoyed", "schipperke", "scottish deerhound", "scottish terrier", "sealyham terrier", "shetland sheepdog", "shiba inu", "shih tzu", "siberian husky", "silky terrier", "skye terrier", "smooth fox terrier", "soft coated wheaten terrier", "spinone italiano", "staffordshire bull terrier", "standard schnauzer", "sussex spaniel", "tibetan mastiff", "tibetan spaniel", "tibetan terrier", "toy fox terrier", "vizsla", "weimaraner", "welsh springer spaniel", "welsh corgi", "welsh terrier", "west highland white terrier", "whippet", "wire fox terrier", "wirehaired pointing griffon", "yorkshire terrier"]
//Set variable for initial button list
var doggos = ["Puggle", "Beagle", "Boxer", "Tibetan Mastiff"]
//Start listening for enter key. If enter key is clicked, run click event
$("#add-breed").keyup(function(event) {
  if (event.key === "Enter") {
    $("#search-button").click()
  }
})
//Click event listener
$("#search-button").click(function() {
  event.preventDefault()
//Get value for search button to be added
  var doggo = $("#add-breed").val().trim()
//convert to lowercase
  var a = doggo.toLowerCase()
//Check if query is valid. If not, alert user to search for valid breed name
  if (breedList.includes(a) === false) {
    $("#add-breed").val("")
    alert("Please Choose a Dog Breed")
  }
//If search query is valid, call function to add button to the list
  else if (breedList.includes(a) === true) {
    $("#add-breed").val("")
    doggos.push(doggo)
    makeButtons()
  }
})
//Listen for click on dog breed button
$(document).on("click", ".doggo", getDoggos)
//Listen for click on gif to start or stop animation
$(document).on("click", ".gif", animateDoggos)
//Make button for list of search buttons
function makeButtons() {
  $("#buttons-view").empty()
  $(doggos).each(function() {
    var i = $("<button>")
    i.addClass("doggo")
    i.attr("data-name", (this))
    i.text(this)
    $("#buttons-view").append(i)
  })
}
//Query giphy api for gifs related to search button name
function getDoggos() {
  var doggyBreed = $(this).attr("data-name")
  doggyBreed += " dog"
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+doggyBreed+"&api_key=nj2L3AJbEx8McF31i48AY7VqvWmJMVvc&limit=10"
//Get objects for search
  $.ajax({
    url : queryURL,
    method : "GET"
  }).then(function(response){
    console.log(response)
    var results = response.data
//Each loop to iterate over the array and add gif cards to display
    $(results).each(function() {
      var rating = this.rating
      var imgTitle = this.title
      var p = "Rating: " + rating
      var title = "Title: " + imgTitle
      var download = imgTitle + "." + this.type
//Bootstrap card needs to be added as a unit of divs or it won't format properly
      var dogDiv = '<div><div class="card"><img class="card-img-top" id="dog-image"><div class="card-top"><p class="card-text" id="rating"></p><p id="title"></p></div></div></div></div>'
      $("#doggos-here").prepend(dogDiv)
      $("#rating").text(p)
      $("#title").text(title)
      $("#dog-image").attr("src", this.images.fixed_height_still.url)
      $("#dog-image").attr("data-still", this.images.fixed_height_still.url)
      $("#dog-image").attr("data-animate", this.images.fixed_height.url)
      $("#dog-image").attr("data-state", "still")
      $("#dog-image").attr("class", "gif")
    })
})
}
//Function called by clicking on image starts or resets animation
function animateDoggos() {
  var state = $(this).attr("data-state")
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate")
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still")
  }
}
//Call function to make initial set of search buttons
makeButtons()
