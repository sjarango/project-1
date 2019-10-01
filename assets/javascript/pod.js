//NASA API Key
var apiKey = "?api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze";
// pod from yesterday
var apod = moment().subtract(1, 'days').format('YYYY-MM-DD');
podAJAX(apod);
display_article("astronomy", "space", apod);
display_article("earth", "earth", apod);

// ajax function to display pod
function podAJAX(date) {

    var apiKey = "?api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze";
    var apodURL = 'https://api.nasa.gov/planetary/apod' + apiKey + '&date=' + date;

    $.ajax({
        url: apodURL,
        method: "GET"
    }).then(function (response) {

        var apodImg = response.url;
        var apodExpl = response.explanation;
        var apodTitle = response.title;

        $("#intro").css('background', 'url(' + apodImg + ')no-repeat center center fixed');
        $('#apod').attr('src', apodImg);
        $('#apodExpl').text(apodExpl);
        $('#apodTitle').text(apodTitle);
    });

}

$("#submit-date").on("click", function(event) {
    event.preventDefault();
    console.clear();

    // gets user input
    var date = $("#date").val();
    console.log("Date: " + date);
    
    podAJAX(date);

    clear("space");
    clear("earth");

    display_article("astronomy", "space", date);
    display_article("earth", "earth", date);
    
});

// clears article divs
function clear(divID) {
    $("#" + divID + "-article-name").empty();
    $("#" + divID + "-article-abstract").empty();
    $("#" + divID + "-article-link").empty();
    $("#" + divID + "-error-message").empty();
}

// ajax function to display nyt article
function display_article (topic, divID, dob) {

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
            `<a href="${link}" class="btn btn-info ">Read Article</a>`;


            $("#" + divID + "-article-name").html(nameHTML);
            $("#" + divID + "-article-abstract").html(abstractHTML);
            $("#" + divID + "-article-link").html(linkHTML);
        }
    });

}






