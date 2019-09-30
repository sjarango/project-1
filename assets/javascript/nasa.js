
//----------------Set Variables--------------------
sessionStorage.clear();
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


function addRovOpts(pull) {
    $('#rov').empty();
    for (var f = 0; f < pull.length; f++) {
        var opt = $('<option>');
        opt.attr('value', pull[f].name.toLowerCase());
        opt.text(pull[f].name);
        $('#rov').append(opt);
        }
        
    }


function popCard(roverarray) {

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

var totalDates = [];

function totalDate(rovers) {
    for (var r = 0; r < rovers.length; r++) {

        var startDate = moment(fotos[r][0].earth_date);
        var endDate = moment(fotos[r][fotos[0].length - 1]);
        var dateLength = endDate.diff(startDate, 'days');
        totalDates.push(startDate);
        for (var j = 0; j < dateLength; j++) {
            var nd = moment(startDate.add(1, 'day')).format('YYYY-MM-DD');
            totalDates.push(nd);
        }
        totalDates.push(endDate);
    }
}


var enabledDates = [
    {
        roverName: "",
        cameras: {
            FHAZ: [],
            RHAZ: [],
            NAVCAM: [],
            PANCAM: [],
            MINITES: [],
            CHEMCAM:[],
            MARDI:[],
            MAHLI:[],
            MAST:[],
            ENTRY:[]

        },
    },
    {
        roverName: "",
        cameras: {
            FHAZ: [],
            RHAZ: [],
            NAVCAM: [],
            PANCAM: [],
            MINITES: [],
            CHEMCAM:[],
            MARDI:[],
            MAHLI:[],
            MAST:[],
            ENTRY:[]

        },
    },
    {
        roverName: "",
        cameras: {
            FHAZ: [],
            RHAZ: [],
            NAVCAM: [],
            PANCAM: [],
            MINITES: [],
            CHEMCAM:[],
            MARDI:[],
            MAHLI:[],
            MAST:[],
            ENTRY:[]

        },
    
    }
];

function fhazDates(r) {

    enabledDates[r].roverName = roverFest[r].name;
    
    fotos[r].forEach(function (day,i) {
        day.cameras.forEach(function (cameraName,j) {
           if (fotos[r].earth_date !== null){
                enabledDates[r].cameras[cameraName].push(day.earth_date);
           }
           else {
               enabledDates[r].cameras[cameraName].push(day.sol);
           }
        });
    });
    }

    




Promise.all([promise1, promise2, promise3]).then(function () {
    
    popCard(rovers);
    totalDate(rovers);
    fhazDates(0);
    fhazDates(1);
    fhazDates(2);

    sessionStorage.setItem("manifest", JSON.stringify(roverFest));
    sessionStorage.setItem("fotos", JSON.stringify(fotos));
    roverPull = JSON.parse(sessionStorage.getItem("manifest"));
    fotoPull = JSON.parse(sessionStorage.getItem("fotos"));
    addRovOpts(roverPull);
   
});

var apod = moment().subtract(1, 'days').format('YYYY-MM-DD');

var apodURL = 'https://api.nasa.gov/planetary/apod' + apiKey + '&date=' + apod;



$.ajax({
    url: apodURL,
    method: "GET"
}).then(function (response) {
    var apodImg = response.url;
   
    $("#intro").css('background', 'url(' + apodImg + ')no-repeat center center fixed');
    $('#apod').attr('src', apodImg);
   
});


