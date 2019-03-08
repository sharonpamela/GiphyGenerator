$(document).ready(function () {

    let initButtons = ["baby", "cats", "dogs", "random", "fun", "old", "thanks", "hello"]
    var giphyOffset =0; 
    //populate the page with the initial buttons
    for (i = 0; i < initButtons.length; i++) {
        renderButtons(initButtons[i]);
    }
    // Function for displaying buttons
    function renderButtons(buttonName) {
        let button = $("<button>");
        button.attr("data-topic", buttonName);
        button.attr("data-offset",giphyOffset);
        button.addClass("button");
        button.text(buttonName);
        $("#button-container").append(button);
    }

    //display the trending gifs at the beginning of Program
    // Constructing a queryURL using the topic name and the key provided in private key.js file linked to html
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=trending&api_key=" + key + "&limit=10";
    console.log("query:" + queryURL);
    
    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })// After data comes back from the request
    .then(function (response) {
        // storing the data from the AJAX request in the results variable
        var results = response.data;
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {
            // Creating and storing a div tag
            var giphyDiv = $("<div>");
            giphyDiv.attr("id","imgDiv");
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            p.attr("id","rating");
            // Creating and storing an image tag
            var giphyImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            giphyImage.attr("src", results[i].images.fixed_height_still.url);
            giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
            giphyImage.attr("data-animate", results[i].images.fixed_height.url);
            giphyImage.attr("data-state", "still");
            giphyImage.addClass("gif");
            // Appending the paragraph and image tag to the giphyImage
            giphyDiv.append(p);
            giphyDiv.append(giphyImage)
            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-container").prepend(giphyDiv);
        }
    });
    
    // Adding click event listen listener to all buttons
    $("#button-container").on("click", "button", function () {
        // Grabbing and storing the data-topic property value from the button
        var topic = $(this).attr("data-topic");
        giphyOffset = $(this).attr("data-offset");
        console.log("offset: "+giphyOffset);

        // Constructing a queryURL using the topic name and the key provided in private key.js file linked to html
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=" + key + "&limit=10"+ "&offset="+giphyOffset;

        //update the offset atribute of this button for next call
        var newOffset = parseInt(giphyOffset)+10;
        $(this).attr("data-offset",newOffset);

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function (response) {
                // storing the data from the AJAX request in the results variable
                var results = response.data;
                console.log(results);

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {
                    // Creating and storing a div tag
                    var giphyDiv = $("<div>");
                    giphyDiv.attr("id","imgDiv");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    p.attr("id","rating");

                    // Creating and storing an image tag
                    var giphyImage = $("<img>");

                    // Setting the src attribute of the image to a property pulled off the result item
                    giphyImage.attr("src", results[i].images.fixed_height_still.url);
                    giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
                    giphyImage.attr("data-animate", results[i].images.fixed_height.url);
                    giphyImage.attr("data-state", "still");
                    giphyImage.addClass("gif");

                    // Appending the paragraph and image tag to the giphyImage
                    giphyDiv.append(p);
                    giphyDiv.append(giphyImage)
                    // Prependng the gif div to the HTML page in the "#gifs-container" div
                    $("#gifs-container").prepend(giphyDiv);
                    //change label of results area
                    $("#trending").text("Search results:");
                }
            });
    });

    //listen for a click on any giphy image
    $("#gifs-container").on("click", "img", function () {
        console.log("clicked gif");
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        console.log(state);
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // This function handles events where one button is clicked
    $("#add-topic").on("click", function (event) {
        event.preventDefault();
        // This line will grab the text from the input box
        var newTopic = $("#search-input").val().trim();
        renderButtons(newTopic);
        // Clear form input box
        $("#search-input").val("");
    });
});//end of (document).ready