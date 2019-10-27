


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
            
            var inputDiv = $("<div>");

            inputDiv.addClass("gifs");

        
            var rating = response.data[i].rating;

        
            var pRating = $("<p>").text("Rating: " + rating);

            var imgURL = response.data[i].images['480w_still'].url;
            
            var image = $("<img>").attr("src", imgURL);
            
            
            inputDiv.append(pRating);

            
            inputDiv.append(image);
            
            
            $("#gifs-view").append(inputDiv);
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

// This function handles events where a movie button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#gif-input").val().trim();

    // Adding movie from the textbox to our array
    topics.push(gif);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});


$(document).on("click", ".gif-btn", displayInfo);


renderButtons();