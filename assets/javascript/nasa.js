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

var intro = 'https://api.nasa.gov/mars-photos/api/v1/manifests/';
var names = [];
var landDates = [];
var launchDates = [];
var stats = [];
var maxSols = [];
var maxDates = [];
var totalPhotos = [];
var SOcams = ["fhaz", "rhaz", "navcam", "pancam", "minites"];
var CUcams = ["fhaz", "rhaz", "mast", "chemcam", "mardi", "mahli", "navcam"];
var cams = [];
var camys = [];
var rovers = ["Curiosity", "Opportunity", "Spirit"];
var roversA = [];

var manifestParams = ["launch-date-", "land-date-", "max-date-", "solNum-", "totalPhot-"];
var solSpir = [];
var solSpir = []
var numFots = [];

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



// var nUrl = intro + rovers[k] + apiKey;

$.ajax({
    url: intro + rovers[0] + apiKey,
    method: "GET"
}).then(function (response) {
    var name = response.photo_manifest.name;
    // names.push(name);
    var landDate = response.photo_manifest.landing_date;
    // landDates.push(landDate);
    var launchDate = response.photo_manifest.launch_date;
    // launchDates.push(launchDate);
    var status = response.photo_manifest.status;
    // stats.push(status);
    var maxSol = response.photo_manifest.max_sol;
    // maxSols.push(maxSol);
    var maxDate = response.photo_manifest.max_date;
    // maxDates.push(maxDate);
    var totalPhot = response.photo_manifest.total_photos;
    // totalPhotos.push(totalPhot);

    $('#rover-name-0').text('Rover: ' + name);
    $('#status-0').text('Status: ' + status);
    $('#launch-date-0').text('Launch Date: ' + launchDate);
    $('#land-date-0').text('Landing Date: ' + landDate);
    $('#max-date-0').text('Max Date: ' + maxDate);
    $('#solNum-0').text('Total Sols: ' + maxSol);
    $('#totalPhot-0').text('Total # Photos: ' + totalPhot);

});

$.ajax({
    url: intro + rovers[1] + apiKey,
    method: "GET"
}).then(function (response) {
    var name = response.photo_manifest.name;
    // names.push(name);
    var landDate = response.photo_manifest.landing_date;
    // landDates.push(landDate);
    var launchDate = response.photo_manifest.launch_date;
    // launchDates.push(launchDate);
    var status = response.photo_manifest.status;
    // stats.push(status);
    var maxSol = response.photo_manifest.max_sol;
    // maxSols.push(maxSol);
    var maxDate = response.photo_manifest.max_date;
    // maxDates.push(maxDate);
    var totalPhot = response.photo_manifest.total_photos;
    // totalPhotos.push(totalPhot);

    $('#rover-name-1').text('Rover: ' + name);
    $('#status-1').text('Status: ' + status);
    $('#launch-date-1').text('Launch Date: ' + launchDate);
    $('#land-date-1').text('Landing Date: ' + landDate);
    $('#max-date-1').text('Max Date: ' + maxDate);
    $('#solNum-1').text('Total Sols: ' + maxSol);
    $('#totalPhot-1').text('Total # Photos: ' + totalPhot);

});

$.ajax({
    url: intro + rovers[2] + apiKey,
    method: "GET"
}).then(function (response) {
    var name = response.photo_manifest.name;
    // names.push(name);
    var landDate = response.photo_manifest.landing_date;
    // landDates.push(landDate);
    var launchDate = response.photo_manifest.launch_date;
    // launchDates.push(launchDate);
    var status = response.photo_manifest.status;
    // stats.push(status);
    var maxSol = response.photo_manifest.max_sol;
    // maxSols.push(maxSol);
    var maxDate = response.photo_manifest.max_date;
    // maxDates.push(maxDate);
    var totalPhot = response.photo_manifest.total_photos;
    var solLength = response.photo_manifest.photos.length;
    numFots.push(solLength);

    $('#rover-name-2').text('Rover: ' + name);
    $('#status-2').text('Status: ' + status);
    $('#launch-date-2').text('Launch Date: ' + launchDate);
    $('#land-date-2').text('Landing Date: ' + landDate);
    $('#max-date-2').text('Max Date: ' + maxDate);
    $('#solNum-2').text('Total Sols: ' + maxSol);
    $('#totalPhot-2').text('Total # Photos: ' + totalPhot);

    for (var b = 0; b < solLength; b++) {

        var camys = response.photo_manifest.photos[b].cameras;
        var sols = response.photo_manifest.photos[b].sol;
        cams.push(camys);
        solSpir.push(sols);


    }
});
binString();
// var newUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?" + "sol=" + d + "&camera=" + SOcams[d] + apiKey;

function binString() {
    
    var fhazBin = [];
    for (var s = 0; s < numFots[0]; s++) {
        var x;
        if (cams[s].includes('FHAZ') === true) {
            x = 1;

        }
        else {
            x = 0;
        }
        
        fhazBin.push(x);
    }
    console.log(fhazBin);

    return fhazBin;
}

// 
// var camInput = $('#input-box').val();
// if (camInput == 'FHAZ') {
//     var sols = 

//                         break;
//                     case 'RHAZ':
//     rhazCount++;
//     break;
//                     case 'NAVCAM':
//     navcamCount++;
//     break;
//                     case 'PANCAM':
//     pancamCount++;
//     break;
//                     case 'MINITES':
//     minitesCount++;
//     break;
// }

//             });
//     }


//-----Moment.js used to standardize date format-----------
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



