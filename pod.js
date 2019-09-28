
//----------------Set Variables--------------------
//Nasa API Key
var apiKey = "?api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze";
// Create an AJAX call to retrieve data




$("#submit-date").on("click", function(event) {
    event.preventDefault();
    // get user input
    var date = $("#date").val();
    console.log("Date: " + date);
    var customApod = 'https://api.nasa.gov/planetary/apod' + apiKey + '&date=' + date;
	$.ajax({
        url: customApod,
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
});





var apod = moment().subtract(1, 'days').format('YYYY-MM-DD');

var apodURL = 'https://api.nasa.gov/planetary/apod' + apiKey + '&date=' + apod;



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
