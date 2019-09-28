// SETUP VARIABLES

var apiKey = "&api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze";
var rovCams = [];


// FUNCTIONS
// ==========================================================


function rowNum(photos) {
    var rows = 0;
    if (photos % 4 !== 0) {
        rows = Math.floor(photos / 4) + 1;
    }
    else {
        rows = photos % 4;
    }
    return rows;
}

function addRovOpts(pull) {
    console.log(pull);
    for (var f = 0; f < pull.length; f++) {
        var opt = $('<option>');
        opt.attr('value', pull[f].name.toLowerCase());
        opt.text(pull[f].name);
        $('#rov').append(opt);
    }
}

function addImage(src, imgDiv) {

    var img = $('<img>');
    img.addClass('d-block');
    img.attr('src', src);
    imgDiv.append(img);
    $('#images').append(imgDiv);
}
// The AJAX function uses the queryURL and GETS the JSON data associated with it.
// The data then gets stored in the variable called: "NYTData"
function searchPhotos(url) {
    $.ajax({
        url: url,
        method: "GET"
    }).done(function (response) {

        var photos = response.photos.length;

        var rows = rowNum(photos);

        var j = 0;
        console.log(photos);
        console.log(rows);

        for (i = 0; i < rows; i++) {
            var imgDiv = $('<div>');
            if (i == 0) {
                imgDiv.addClass('carousel-item active');
            }
            else {
                imgDiv.addClass('carousel-item');
            }
            for (h = 0; h < 4; h++) {
                var imgDiv2 = $('<div>');
                j++;
                var src = response.photos[j].img_src;
                imgDiv2.addClass('col-xs-3 col-sm-3 col-md-3');
                imgDiv.append(imgDiv2);
                addImage(src, imgDiv);

            }
        }
    });
}


// METHODS ==========================================================

// // on.("click") function associated with the Search Button
$("#run-search").on("click", function (event) {
    event.preventDefault();


    $("#images").empty();

    // Grabbing text the user typed into the search input
    var eDate = $("#date").val();
    var cam = $("#camera-select").val();
    var rov = $("#rov").val();

    var searchURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rov + "/photos?" + "earth_date=" + eDate + "&camera=" + cam + apiKey;


    searchPhotos(searchURL);

});

$('#rov').on('change', function () {

    $("#cams").removeClass('d-none');
    camPair();




});


$("#camera-select").on('change', function () {
    var cam = $("#camera-select").val();
    $('#calendar').removeClass('d-none');

    var dAtes = enabledDates[r].cameras[cam];
    var sDate = moment(dAtes[0]);




});




function camPair() {
    $('#camera-select').empty();
    if ($('#rov').val() == enabledDates[0].roverName.toLowerCase()) {
        r = 0;

    }
    else if ($('#rov').val() == enabledDates[1].roverName.toLowerCase()) {
        r = 1;

    }
    else {
        r = 2;

    }

    var camL = Object.keys(enabledDates[r].cameras).length;
    var keyS = Object.keys(enabledDates[r].cameras);
    console.log(camL);
    console.log(keyS);


    for (var e = 0; e < camL; e++) {
        var camy = keyS[e];
        if (enabledDates[r].cameras[camy].length !== 0) {
            rovCams.push(camy);
        }
    }

    for (var h = 0; h < rovCams.length; h++) {
        var opt = $('<option>');
        opt.attr('value', rovCams[h]);
        opt.text(rovCams[h]);
        $('#camera-select').append(opt);
    }
}