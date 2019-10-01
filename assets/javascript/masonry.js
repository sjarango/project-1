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
    $('#camera-select').empty();
    $('#sDate').empty();
    $('#eDate').empty();
    $('#camsavail').empty();
    sessionStorage.removeItem('images');
    sessionStorage.removeItem('dates');
    imgFest.roverName = $('#rov').val();
    camPair();
});

function camPair() {                                        //This function assigns text value to numerical ordering of object
    var rov = $('#rov').val();                              //and then defines the camera selections based on what cameras are 
    console.log(rov);
    if (rov == enabledDates[0].roverName.toLowerCase()) {   //present in this rover's camera object array.
        r = 0;
    }
    else if (rov == enabledDates[1].roverName.toLowerCase()) {
        r = 1;
    }
    else {
        r = 2;
    }
    imgFest.r = r;

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

//-----Camera Selector-----//
$("#camera-select").on('change', function () {                      //Not all dates are available for each camera so depending on the 
    $('#camsavail').empty();                                        //rover and camera selection a new date array is assigned.  The big exception is 
    $('#sDate').empty();                                            //Spirit rover.  The dates available for each camera is present in the rover manifest
    $('#eDate').empty();                                            //which is convenient because ,000's of api calls are spared in order to get the full
    var cam = $("#camera-select").val();                            //date array. For the Spirit rover the earth_date is not present in the manifest, but 
    //martian day(sol) is made available, which is used instead of earth_date.
    console.log(cam);
    imgFest.camera = cam;                                           //A new object is created for the date range api iteration
    var r = imgFest.r;
    var dAtes = enabledDates[r].cameras[cam];
    sessionStorage.setItem("dates", JSON.stringify(dAtes));

    for (var f = 0; f < dAtes.length; f++) {               //The camera selection dictates the dates available
        var opt = $('<option>');                         //opt = start date
        var opt2 = $('<option>');                         //opt2 = end date
        var sDate = dAtes[0];
        if (f == 0) {
            opt.attr('placeholder', moment(sDate).format('MM/DD/YY'));
        }

        opt.attr('value', dAtes[f]);
        opt2.attr('value', dAtes[f]);
        opt2.attr('placeholder', moment(sDate).add(10, 'days').format('MM/DD/YY'));
        opt.text(moment(dAtes[f]).format('MM/DD/YY'));
        opt2.text(moment(dAtes[f]).format('MM/DD/YY'));
        $('#sDate').append(opt);
        $('#eDate').append(opt2);
    }

    var camName = $('<h3>').attr('id', cam);
    camName.text("The " + cam + " camera has " + dAtes.length + " days with images starting " + moment(dAtes[0]).format('MM/DD/YY') + " and ending " + moment(dAtes[dAtes.length - 1]).format('MM/DD/YY'));
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
        r: "",
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
    for (var j = 0; j < srcNum; j++) {
            var imgDiv = $('<div>');
            imgDiv.addClass('carousel-item');
            var imgDiv2 = $('<div>');
            imgDiv2.addClass('col-12');
            var src = images[j].img_src;
            var img = $('<img>');
            // img.addClass('d-block');
            img.attr('src', src);
            var imgDiv3 = $('<div>');
            imgDiv3.addClass('carousel-caption');
            var imgH4 = $('<h4>');
            imgH4.text('Earth Date: ' + moment(images[j].earth_date).format('MM/DD/YY'));
            var pTag = $('<p>');
            pTag.text('Image id: ' + images[j].id);
            imgDiv3.append(imgH4,pTag);
            imgDiv2.append(img,imgDiv3);
            imgDiv.append(imgDiv2);

            
            $('#images').append(imgDiv);

        }
 
    var carItem = document.getElementsByClassName('carousel-item');
    carItem[0].classList.add('active');
}


function btw(start, ennd, dateArray) {
    var diff = moment(ennd).diff(moment(start), 'days');
    dateArray.forEach(function (day, i) {
        if (day >= start == true && day <= ennd == true) {


            newArray.push(day);

        }
        return diff;
    });
}

function rowNum(photos) {
    var rows;
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

