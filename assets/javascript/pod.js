//NASA API Key
var apiKey = "?api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze";
// pod from yesterday
var apod = moment().subtract(1, 'days').format('YYYY-MM-DD');
podAJAX(apod);

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

    // gets user input
    var date = $("#date").val();
    console.log("Date: " + date);
    
    podAJAX(date);
    
});






