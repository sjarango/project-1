//   //---------------Initialize Firebase (YOUR OWN APP)------------------------
//   var firebaseConfig = {
//     apiKey: "AIzaSyAlRsXALoi52VoaIuSpgtxUsWV3w-l6BPY",
//     authDomain: "classproj-c95fe.firebaseapp.com",
//     databaseURL: "https://classproj-c95fe.firebaseio.com",
//     projectId: "classproj-c95fe",
//     storageBucket: "",
//     messagingSenderId: "813898612157",
//     appId: "1:813898612157:web:e01fb2f037bebac48d26d4"
// };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

//     // Create a variable to reference the database.
//     var DBMars = firebase.database();
//     DBMars.ref().on("value", function(snapshot) {

//         var sv = snapshot.val();

//         // Console.loging the last user's data
//         console.log(sv.name);
//         console.log(sv.role);
//         console.log(sv.startDate);
//         console.log(sv.rate);

//         // Change the HTML to reflect
//         $("#name-display").text(sv.name);
//         $("#email-display").text(sv.email);
//         $("#age-display").text(sv.age);
//         $("#comment-display").text(sv.comment);

//         // Handle the errors
//       }, function(errorObject) {
//         console.log("Errors handled: " + errorObject.code);
//       });


//----------------Set Variables--------------------
//Nasa API Key
var apiKey = "?api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze";
// Create an AJAX call to retrieve data

var mcURL = 'https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity?api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze';

var cuURL = 'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/images/551041main_pia14156-full_full.jpg';
var opURL = 'https://pressfrom.info/upload/images/real/2018/11/16/nasa-confirms-mars-opportunity-rover-did-not-send-signal-back-to-earth__330925_.jpg?content=1';
var spURL = 'https://solarsystem.nasa.gov/system/content_pages/main_images/1068_rover2-1.jpg';

var imgUrls = [cuURL, opURL, spURL];
var rovDates = ['2019-09-18', '2017-06-09', '2008-02-09'];
var rovers = ["Curiosity", "Opportunity", "Spirit"];
var intro = 'https://api.nasa.gov/mars-photos/api/v1/manifests/';


var SOcams = ["fhaz", "rhaz", "navcam", "pancam", "minites"];
var CUcams = ["fhaz", "rhaz", "mast", "chemcam", "mardi", "mahli", "navcam"];

var roversA = [];

var manifestParams = ["launch-date-", "land-date-", "max-date-", "solNum-", "totalPhot-"];

// getResponse(rovers);
renderRovers(imgUrls);


function renderRovers(urls) {
    var rCard = $('#rovercards');
    for (var i = 0; i < urls.length; i++) {
        //<!--Card Image-->
        var cardDiv = $('<div>');
        cardDiv.addClass('card mb-4');
        var oLayCard = $('<div>');
        oLayCard.addClass('view overlay');
        oLayCard.attr('id', rovers[i]);
        var roverImage = $('<img>');
        roverImage.addClass('card-img-top');
        roverImage.attr('id', 'image-' + i);
        roverImage.attr('src', urls[i]);
        roverImage.attr('style', 'height: 250px;width: 100%');

        var mask = $('<div>');
        mask.addClass('mask rgba-white-slight');
        roverImage.append(mask);
        oLayCard.append(roverImage);
        cardDiv.append(oLayCard);
        //<!--Card Content-->
        var bodDiv = $('<div>');
        bodDiv.addClass('card-body elegant-color white-text rounded-bottom');
        //<!--Title-->
        var hTitle = $('<h3>');
        hTitle.addClass('card-title');
        hTitle.attr('id', 'rover-name-' + i);
        var hStat = $('<h4>');
        hStat.addClass('card-title');
        hStat.attr('id', 'status-' + i);
        bodDiv.append(hTitle);
        bodDiv.append(hStat);
        //<!--Text-->
        for (var j = 0; j < manifestParams.length; j++) {
            var pTag = $('<p>');
            pTag.addClass('card-text');
            pTag.attr('id', manifestParams[j] + i);
            bodDiv.append(pTag);
        }
        cardDiv.append(bodDiv);
        rCard.append(cardDiv);
    }
}





//-----Global variables used in function maniFest-----//

var roverFest = [];
var fotos = [];
var promise1 = $.ajax({
    url: intro + rovers[0] + apiKey,
    method: "GET"
}).then(function (response) {
    var manifest = response.photo_manifest;
    var photos = response.photo_manifest.photos;
    roverFest.push(manifest);
    fotos.push(photos);
});

var promise2 = $.ajax({
    url: intro + rovers[1] + apiKey,
    method: "GET"
}).then(function (response) {
    var manifest = response.photo_manifest;
    var photos = response.photo_manifest.photos;
    roverFest.push(manifest);
    fotos.push(photos);
});

var promise3 = $.ajax({
    url: intro + rovers[2] + apiKey,
    method: "GET"
}).then(function (response) {
    var manifest = response.photo_manifest;
    var photos = response.photo_manifest.photos;
    roverFest.push(manifest);
    fotos.push(photos);
});








function popCard (roverarray){
    
    for (var k = 0; k < roverarray.length; k++) {
        $('#rover-name-' + k).text('Rover: ' + roverFest[k].name);
        $('#status-' + k).text('Status: ' + roverFest[k].status);
        $('#launch-date-' + k).text('Launch Date: ' + roverFest[k].launch_date);
        $('#land-date-' + k).text('Landing Date: ' + roverFest[k].landing_date);
        $('#max-date-' + k).text('Max Date: ' + roverFest[k].max_date);
        $('#solNum-' + k).text('Total Sols: ' + roverFest[k].max_sol);
        $('#totalPhot-' + k).text('Total # Photos: ' + roverFest[k].total_photos);
    }
}


Promise.all([promise1, promise2, promise3]).then(function (response) {
    console.log(roverFest);
    console.log(fotos);
    popCard(rovers);
        // var maniFest1 = response[0].photo_manifest;
        // var maniFest2 = response[1].photo_manifest;
        // var maniFest3 = response[2].photo_manifest;
        
        sessionStorage.setItem("manifest", JSON.stringify(roverFest));
        sessionStorage.setItem("fotos", JSON.stringify(fotos));
        // sessionStorage.setItem("manifest2", JSON.stringify(maniFest2));
        // sessionStorage.setItem("manifest3", JSON.stringify(maniFest3));
    
});


//-----Moment.js used to standardize date format-----------

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
