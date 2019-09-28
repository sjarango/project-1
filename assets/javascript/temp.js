
$("#submit-dob").on("click", function(event) {
    event.preventDefault();

    var userDOB = $("#dob").val();
    console.log("DOB: " + userDOB);

    clear("space");
    clear("earth");

    ajaxPrint("space", "space", userDOB);

    ajaxPrint("earth", "earth", userDOB);

    //$("#dob").val("");
});


function clear(divID) {
    $("#" + divID + "-article-name").empty();
    $("#" + divID + "-article-abstract").empty();
    $("#" + divID + "-article-iframe").empty();
    $("#" + divID + "-error-message").empty();

}

function ajaxPrint (topic, divID, dob) {

    var key = "yJPyDNx7A7KgghCqQtWgVTgqXOGuvYro";
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + topic + "&begin_date=" + dob + "&end_date=" + dob + "&api-key=" + key;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        console.log(response);
        var results = response.response;

        if (results.docs === undefined || results.docs.length == 0) {
            // array empty or does not exist
            console.log("No articles found");
            var error = "<h4>No Articles Found</h4>"
            $("#" + divID + "-error-message").html(error);
        }
        else {
            // Gets article name
            var title = results.docs[0].headline.main;
            var abstract = results.docs[0].abstract;
            var link = results.docs[0].web_url;

            console.log(title);
            console.log(abstract);
            console.log(link);

            var nameHTML = "<h2>" + title + "</h2>";
            var abstractHTML = "<p>" + abstract + "</p>";

            var linkHTML = 
            `<a href="${link}" class="btn btn-info stretched-link">Read Article</a>`;


            $("#" + divID + "-article-name").html(nameHTML);
            $("#" + divID + "-article-abstract").html(abstractHTML);
            $("#" + divID + "-article-iframe").html(linkHTML);
            


        }
    });

}