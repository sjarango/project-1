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
var rovDates = ['2019-09-18', '2017-06-09', '2008-02-09']

var intro = 'https://api.nasa.gov/mars-photos/api/v1/manifests/';
var names = [];
var landDates = [];
var launchDates = [];
var stats = [];
var maxSols = [];
var maxDates = [];
var totalPhotos = [];

var rovers = ["Curiosity", "Opportunity", "Spirit"];
var roversA = [];
var cameras = ["fhaz", "navcam", "pancam", "entry", "rhaz"];
var manifestParams = ["launch-date-", "land-date-", "max-date-", "solNum-", "totalPhot-"];


getResponse(rovers);


function getResponse(rovers) {
    for (var k = 0; k < rovers.length; k++) {

        var nUrl = intro + rovers[k] + apiKey;
        console.log(nUrl);

        $.ajax({
            url: nUrl,
            method: "GET"
        }).then(function (response) {
            var name = response.photo_manifest.name;
            names.push(name);
            var landDate = response.photo_manifest.landing_date;
            landDates.push(landDate);
            var launchDate = response.photo_manifest.launch_date;
            launchDates.push(launchDate);
            var status = response.photo_manifest.status;
            stats.push(status);
            var maxSol = response.photo_manifest.max_sol;
            maxSols.push(maxSol);
            var maxDate = response.photo_manifest.max_date;
            maxDates.push(maxDate);
            var totalPhot = response.photo_manifest.total_photos;
            totalPhotos.push(totalPhot);
            

        });
       renderRovers(imgUrls);
    }

}

function renderRovers(urls) {
    var rCard = $('#rovercards')
    for (var i = 0; i < urls.length; i++) {
        //<!--Card Image-->

        var cardDiv = $('<div>');
        cardDiv.addClass('col-lg-4 col-md-12 mb-4 card');
        var oLayCard = $('<div>');
        oLayCard.addClass('view overlay');
        oLayCard.attr('id', rovers[i]);
        var roverImage = $('<img>');
        roverImage.addClass('card-img-top');
        roverImage.attr('id', 'image-' + i);
        roverImage.attr('src', urls[i]);

        var mask = $('<div>');
        mask.addClass('mask rgba-white-slight');
        roverImage.append(mask);
        oLayCard.append(roverImage);
        cardDiv.append(oLayCard);
        //<!--Card Content-->
        var bodDiv = $('<div>');
        bodDiv.addClass('card-body');
        //<!--Title-->
        var hTitle = $('<h4>');
        hTitle.addClass('card-title');
        hTitle.attr('id', 'rover-name-' + i);
        hTitle.text('Rover: ' + names[i]);
        var hStat = $('<h3>');
        hStat.addClass('card-title');
        hStat.attr('id', 'status-' + i);
        $('#status-' + i).text('Status: ' + stats[i]);
        //<!--Text-->
        bodDiv.append(hTitle);
        bodDiv.append(hStat);
        for (var j = 0; j < manifestParams.length; j++) {
            var pTag = $('<p>');
            pTag.addClass('card-text');
            pTag.attr('id', manifestParams[j] + i);
            bodDiv.append(pTag);

        }

        $('#launch-date-' + i).text('Launch Date: ' + launchDates[i]);
        $('#land-date-' + i).text('Landing Date: ' + landDates[i]);
        $('#max-date-' + i).text('Max Date: ' + maxDates[i]);
        $('#solNum-' + i).text('Total Sols: ' + maxSols[i]);
        $('#totalPhot-' + i).text('Total # Photos: ' + totalPhotos[i]);

        cardDiv.append(bodDiv);
        rCard.append(cardDiv);

    }
}



console.log(landDates);
console.log(launchDates);
console.log(stats);
console.log(maxSols);
console.log(maxDates);
console.log(totalPhotos);

// $.ajax({
//     url: curiosURL,
//     method: "GET"
// }).then(function (response) {
//     var curioFhazImg = response.photos[0].img_src;
//     var curioFhazTitle = response.photos[0].camera.full_name;
//     var curioFhazEDate = response.photos[0].earth_date;
//     var curioFhazRover = response.photos[0].rover.name;
//     var curioFhazLaunch = response.photos[0].rover.launch_date;
//     var curioFhazLanding = response.photos[0].rover.landing_date;
//     $('#curiosity').attr('src', curioFhazImg);
//     $('#curiosity-title').text(curioFhazTitle);
//     $('#curiosity-EDate').text('Earth Date: ' + curioFhazEDate);
//     $('#curiosity-Rover').text('Rover: ' + curioFhazRover);
//     $('#curiosity-Launch').text('Launch Date: ' + curioFhazLaunch);
//     $('#curiosity-Landing').text('Landing Date: ' + curioFhazLanding);

// });

// $.ajax({
//     url: opposURL,
//     method: "GET"
// }).then(function (response) {
//     var oppoFhazImg = response.photos[0].img_src;
//     console.log(oppoFhazImg);
//     var oppoFhazTitle = response.photos[0].camera.full_name;
//     var oppoFhazEDate = response.photos[0].earth_date;
//     console.log(oppoFhazEDate);
//     var oppoFhazRover = response.photos[0].rover.name;
//     var oppoFhazLaunch = response.photos[0].rover.launch_date;
//     var oppoFhazLanding = response.photos[0].rover.landing_date;
//     $('#opportunity').attr('src', oppoFhazImg);
//     $('#oppo-title').text(oppoFhazTitle);
//     $('#oppo-EDate').text('Earth Date: ' + oppoFhazEDate);
//     $('#oppo-Rover').text('Rover: ' + oppoFhazRover);
//     $('#oppo-Launch').text('Launch Date: ' + oppoFhazLaunch);
//     $('#oppo-Landing').text('Landing Date: ' + oppoFhazLanding);
// });

// $.ajax({
//     url: spiritURL,
//     method: "GET"
// }).then(function (response) {
//     var spiritFhazImg = response.photos[0].img_src;
//     console.log(spiritFhazImg);
//     var spiritFhazTitle = response.photos[0].camera.full_name;
//     var spiritFhazEDate = response.photos[0].earth_date;
//     console.log(spiritFhazEDate);
//     var spiritFhazRover = response.photos[0].rover.name;
//     var spiritFhazLaunch = response.photos[0].rover.launch_date;
//     var spiritFhazLanding = response.photos[0].rover.landing_date;
//     $('#spirit').attr('src', spiritFhazImg);
//     $('#spirit-title').text(spiritFhazTitle);
//     $('#spirit-EDate').text('Earth Date: ' + spiritFhazEDate);
//     $('#spirit-Rover').text('Rover: ' + spiritFhazRover);
//     $('#spirit-Launch').text('Launch Date: ' + spiritFhazLaunch);
//     $('#spirit-Landing').text('Landing Date: ' + spiritFhazLanding);
// });

var apod = moment().subtract(1, 'days').format('YYYY-MM-DD');

var apodURL = 'https://api.nasa.gov/planetary/apod?api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze&date=' + apod;
$.ajax({
    url: apodURL,
    method: "GET"
}).then(function (response) {
    var apodImg = response.url;
    var apodExpl = response.explanation;
    var apodTitle = response.title;
    $('#apod').attr('src', apodImg);
    $('#apodExpl').text(apodExpl);
    $('#apodTitle').text(apodTitle);
});




// //-------Add Gif Button--------------------------
// $("#add-gif").on("click", function (event) {
//     event.preventDefault();
//     var topic = $("#topic-input").val().trim();
//     topics.push(topic);
//     var gifRating = $("#rating")[0].value;
//     var gifLimit = $("#limit")[0].value;
//     var gifURL = "//api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + gifApiKey + "&limit=" + gifLimit;
//     src = [];
//     stillURL = [];
//     animeURL = [];
//     title = [];
//     rating = [];
//     $.ajax({
//         url: gifURL,
//         method: "GET"
//     }).then(function (response) {
//         results = response.data;
//         renderCard(results);
//     });
// });


// function renderCard(results) {
//     for (var i = 0; i < gifLimit; i++) {
//         src.push(results[i].images.fixed_height_still.url);
//         stillURL.push(results[i].images.fixed_height_still.url);
//         animeURL.push(results[i].images.fixed_height.url);
//         title.push(results[i].title.toUpperCase());
//         rating.push(results[i].rating.toUpperCase());
//         var gifCard = $("<div>");
//         gifCard.addClass('card border-success mb-3');
//         gifCard.attr('style', 'max-width: 24rem;max-height: 20rem');
//         var gifImg = $("<img>");
//         gifImg.addClass("card-img-top gif");
//         gifImg.attr("data-state", "still");
//         var cardText = $("<div>");
//         cardText.addClass("card-body");
//         var h = $("<h5>");
//         h.addClass('card-title');
//         var p = $("<p>");
//         p.addClass("card-text");
//         gifImg.attr("src", src[i]);
//         gifImg.attr("data-still", stillURL[i]);
//         gifImg.attr("data-animate", animeURL[i]);
//         h.text("Title: " + title[i]);
//         p.text("Rating: " + rating[i]);
//         cardText.append(h, p);
//         gifCard.append(gifImg, cardText);
//         $('#gifResults').prepend(gifCard);

//     }

// }



// //----------Render Buttons Function----------------
// function renderButtons(topics) {
//     $("#button-view").empty();
//     for (var i = 0; i < topics.length; i++) {
//         var topic = topics[i].replace(" ", "");
//         var gifURL = "//api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + gifApiKey + "&limit=" + gifLimit;
//         var gifLi = $('<li>');
//         var gifBut = $('<button>');

//         gifBut.addClass("btn btn-outline-success btn-lg viewGIF");
//         gifBut.attr("data-topic", topics[i]);
//         gifBut.attr("data-url", gifURL);
//         gifBut.attr("type", "submit");
//         gifBut.attr("value", topics[i]);
//         gifBut.text(topics[i].toUpperCase());
//         gifLi.append(gifBut);
//         $("#button-view").prepend(gifLi);
//     }

// }


// //---------------Any Button Click Function--------------------
// $(document).on('click','.viewGIF',function () {
//     var gifURL = $(this).data('url');
//    console.log($(this));
//    console.log(gifURL);
//     src = [];
//     stillURL = [];
//     animeURL = [];
//     title = [];
//     rating = [];
//     $.ajax({
//         url: gifURL,
//         method: "GET"
//     }).then(function (response) {
//         var results = response.data;
//         renderCard(results);
//     });

// });

// //---------Initialize and Change State------------------
// $(document).on("click", ".gif", function () {
//     var state = $(this).attr("data-state");
//     if (state === "still") {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");
//     } else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//     }
// });

// renderButtons(topics);



