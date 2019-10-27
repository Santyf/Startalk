$(document).on("click", ".gif-btn", displayInfo);

var topics = ["Sports", "Dogs", "Gaming", "Music"];

function displayInfo() {
    var name = $(this).attr("data-name");
    var APIKey = "IcqtslR9hjOS6kk8EC1CldDCskqZoWYT";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=" + APIKey + "&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);
        
        for (var i = 0; i < response.data.length; i++) {
           
            var inputDiv = $("<div>")
            inputDiv.addClass("gifs");
            var rating = response.data[i].rating;
            var pRating = $("<p>").text("Rating: " + rating);
            var imgURL = response.data[i].images['480w_still'].url;
            var animateImage = response.data[i].images.fixed_height.url;
            var image = $("<img>").attr("src", imgURL);
            image.attr("src", imgURL);
            image.attr("data-state", "still");
            image.attr("data-still", imgURL);
            image.attr("data-animate", animateImage);
            image.addClass("img");
            inputDiv.append(pRating);
            inputDiv.append(image);
            $("#gifs-view").prepend(inputDiv);
        }
        $(".img").on("click", function () {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });
}
function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("gif-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    topics.push(gif);
    renderButtons();
});
renderButtons();