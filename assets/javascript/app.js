// ie: https://api.nytimes.com/svc/search/v2/articlesearch.json?q=nasa rover&begin_date=20120101&end_date=20131231&api-key=yJPyDNx7A7KgghCqQtWgVTgqXOGuvYro

// get date from user, get top article from search results
// display top article headline name
// display article photo usually under headline
// print article on page...

// extra:
// print article name in New York Times Font
// get drop down list of topics to search from on that day

// function func (topic, divID, dob) inside function

$("#submit-dob").on("click", function(event) {
    event.preventDefault();

    // get user input
    var userDOB = $("#dob").val();
    console.log("DOB: " + userDOB);

    
    topic = "space+astronomy";


    var key = "yJPyDNx7A7KgghCqQtWgVTgqXOGuvYro";
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + topic + "&begin_date=" + userDOB + "&end_date=" + userDOB + "&api-key=" + key;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        console.log(response);
        var results = response.response;

        if (results.docs === undefined || results.docs.length == 0) {
            // array empty or does not exist
            console.log("No articles found");
        }
        else {
            // Gets article name
            var title = results.docs[0].headline.main;
            var abstract = results.docs[0].abstract;
            var link = results.docs[0].web_url;

            console.log(title);
            console.log(abstract);
            console.log(link);
            var html = `
                <h2>${title}</h2>
                 <p>${abstract}</p>
                 <p>${link}</p>
                 `;

            $("#search-results").html("<h2>" + title + "</h2> <p>" + abstract + "</p>"+ "<p>" + link + "</p>");
        }

    });

});