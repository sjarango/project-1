// SETUP VARIABLES

var apiKey = "&api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze";
var rovCams = [];
var intro = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

var cam = $("#camera-select").val();
$("#rov").empty();

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


var newArray = [];


//---On Change Event Functions---//

//-----Rover Selector-----//
$('#rov').on('change', function () {
    $('#cams').empty();
    $('#sDate').empty();
    $('#eDate').empty();
    $('#camsavail').empty();
    sessionStorage.removeItem('images');
    sessionStorage.removeItem('dates');
    imgFest.roverName = $('#rov').val();
    camPair();
});

//-----Camera Selector-----//
$("#camera-select").on('change', function () {
    $('#camsavail').empty();
    $('#sDate').empty();
    $('#eDate').empty();
    var cam = $("#camera-select").val();
    imgFest.camera = cam;

    if (enabledDates[r].roverName !== "Spirit") {
        var dAtes = enabledDates[r].cameras[cam];
        
        sessionStorage.setItem("dates", JSON.stringify(dAtes));

    }
    else {
        var spdAtes = enabledDates[r].totalDates;
        sessionStorage.setItem("dAtes", JSON.stringify(spdAtes));
    }

    var dtes = JSON.parse(sessionStorage.getItem('dAtes'))
    for (var f = 0; f < dtes.length; f++) {             //The camera selection dictates the dates available
        var opt = $('<option>');                         //opt = start date
        var opt2 = $('<option>');                        //opt2 = end date
        var sDate = dtes[0];
        var eDate = dtes[dtes.length - 1];
        if (f == 0) {
            opt.attr('placeholder', moment(sDate).format('MM/DD/YY'));

        }

        opt.attr('value', dtes[f]);
        opt2.attr('value', dtes[f]);
        opt2.attr('placeholder', moment(sDate).add(10, 'days').format('MM/DD/YY'));
        opt.text(moment(dtes[f]).format('MM/DD/YY'));
        opt2.text(moment(dtes[f]).format('MM/DD/YY'));
        $('#sDate').append(opt);
        $('#eDate').append(opt2);
    }

    var camName = $('<h3>').attr('id', cam);
    camName.text("The " + cam + " camera has " + dtes.length + " days with images starting " + moment(dAtes[0]).format('MM/DD/YY') + " and ending " + moment(dAtes[dAtes.length - 1]).format('MM/DD/YY'));
    $('#camsavail').append(camName);

});

//-----Date Selector-----//
$('#eDate').on('change', function () {
    var start = $('#sDate').val();
    var ennd = $('#eDate').val();
    var dateArray = JSON.parse(sessionStorage.getItem("dates"));
    btw(start, ennd, dateArray);
});

//-----Submit Query Button-----//
$("#run-search").on("click", function (event) {
    event.preventDefault();
    $("#images").empty();
    getFotos(newArray);

    // var searchURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rov + "/photos?earth_date=" + eDate + "&camera=" + cam + apiKey;
    // searchPhotos(searchURL);

});

var imgFest = [
    {
        roverName: "",
        camera: "",
        dates: {
        }
    }
];

var images = [];
var camname = "";
var earDate = "";
//---API Query Function---//
function getFotos(datearray) {
    var rov = $("#rov").val();
    var cam = $("#camera-select").val();
    var calls = datearray.map(it => {
        return $.ajax({
            url: intro + rov + "/photos?earth_date=" + it + "&camera=" + cam + apiKey,
            method: "GET",

        }).then(function (response) {
            sessionStorage.setItem('images', JSON.stringify(response.photos));
            // return response.photos;

        });
    });

    Promise.all(calls)
        .then(function () {

            layImages();

        });

}




//---Functions---//

function layImages() {
    var images = JSON.parse(sessionStorage.getItem('images'));
    var srcNum = images.length;
    var rows = rowNum(srcNum);
    var j = 0;
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
            var src = images[j].img_src;
            imgDiv2.addClass('col-xs-3 col-sm-3 col-md-3');
            imgDiv.append(imgDiv2);
            addImage(src, imgDiv);
        }
    }
}

function camPair() {
    var rov = $('#rov').val();
    if (rov == enabledDates[0].roverName.toLowerCase()) {
        r = 0;
    }
    else if (rov == enabledDates[1].roverName.toLowerCase()) {
        r = 1;
    }
    else {
        r = 2;
    }

    var camL = Object.keys(enabledDates[r].cameras).length;
    var keyS = Object.keys(enabledDates[r].cameras);
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

function btw(start, ennd, dateArray) {
    dateArray.forEach(function (day, i) {
        if (day >= start == true && day <= ennd == true) {
            newArray.push(day);
        }
    });
}

function rowNum(photos) {
    var rows = 0;
    if (photos < 4) {
        rows = 1;
    }
    else if (photos > 4 && photos % 4 !== 0) {
        rows = Math.floor(photos / 4) + 1;
    }
    else {
        rows = photos % 4;
    }
    return rows;
}

function addImage(src, imgDiv) {

    var img = $('<img>');
    img.addClass('d-block');
    img.attr('src', src);
    imgDiv.append(img);
    $('#images').append(imgDiv);
}

