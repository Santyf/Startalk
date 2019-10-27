$(document).on("click", ".gif-btn", displayInfo);
$(document).on("click", ".gifs", changeState);



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
            // inputDiv.attr("src", response[i].images.original_still.url);
            // inputDiv.attr("data-still", response[i].images.original_still.url);
            // inputDiv.attr("data-animate", response[i].images.original.url);
            // inputDiv.attr("data-state", "still");
            inputDiv.addClass("gifs");

            var rating = response.data[i].rating;


            var pRating = $("<p>").text("Rating: " + rating);

            var imgURL = response.data[i].images['480w_still'].url;

            var image = $("<img>").attr("src", imgURL);

           
           

            inputDiv.append(pRating);


            inputDiv.append(image);


            $("#gifs-view").prepend(inputDiv);
        }
        
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

function changeState() {
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state == "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    }

    else if (state == "animate") {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
    }
}



renderButtons();