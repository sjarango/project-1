// SETUP VARIABLES

var apiKey = "&api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze";
var rovCams = [];
var intro = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

// FUNCTIONS
// ==========================================================

// Data Picker Initialization

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

    var searchURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rov + "/photos?earth_date=" + eDate + "&camera=" + cam + apiKey;


    searchPhotos(searchURL);

});

var imgFest = [
    {
        roverName: "",
        camera: "",
        dates: {
        }
    }
];

// function getFotos(datearray) {
//     var calls = datearray.map(it => {
//         return $.ajax({
//             url: intro + rov + "/photos?earth_date=" + it + "&camera=" + cam + apiKey,
//             method: "GET",
//             // complete: popCard(rovers),
//         }).then(function (response) {
//             return response.photos;
//         });
//     });

//     Promise.all(calls)
//         .then(photoz => {
//             photoz.forEach(it => {
//                 imgFest.push(it.img_src);

//             });
//             sessionStorage.setItem("manifest", JSON.stringify(roverFest));
//             sessionStorage.setItem("fotos", JSON.stringify(fotos));
//         });
// }
//--Rover Selector--//

$('#rov').on('change', function () {
    $('#camera-select').empty();
    $('#camsavail').empty();
    imgFest.roverName = $('#rov').val()
    $("#cams").removeClass('d-none');
    camPair();




});


$("#camera-select").on('change', function () {

    $('#camsavail').empty();

    var cam = $("#camera-select").val();
    imgFest.camera = cam;

    $('#startcal').removeClass('d-none');
    $('#endcal').removeClass('d-none');

    var dAtes = enabledDates[r].cameras[cam];
    var sDate = dAtes[0];
    var eDate = dAtes[dAtes.length - 1];



    sessionStorage.setItem("dates", JSON.stringify(dAtes));

    for (var f = 0; f < dAtes.length; f++) {
        var opt = $('<option>');
        var opt2 = $('<option>');
        if (f == 0) {
            opt.attr('placeholder', moment(sDate).format('MM/DD/YY'));

        }
        else if (f == (dAtes.length - 1)) {
            opt2.attr('placeholder', moment(eDate).format('MM/DD/YY'));

        }


        opt.attr('value', dAtes[f]);
        opt2.attr('value', dAtes[f]);

        opt.text(moment(dAtes[f]).format('MM/DD/YY'));
        opt2.text(moment(dAtes[f]).format('MM/DD/YY'));


        $('#sDate').append(opt);
        $('#eDate').append(opt2);


    }

    var camName = $('<h3>').attr('id', cam);
    camName.text("The " + cam + " camera has " + dAtes.length + " days with images starting " + moment(dAtes[0]).format('MM/DD/YY') + " and ending " + moment(dAtes[dAtes.length - 1]).format('MM/DD/YY'));
    $('#camsavail').append(camName);





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

var newArray = [];
$('#eDate').on('change',function (){
    var start = $('#sDate').val();
    var ennd = $('#eDate').val();
    var dateArray = JSON.parse(sessionStorage.getItem("dates"));
    btw(start,ennd,dateArray);    
});



function btw(start, ennd, dateArray) {

    dateArray.forEach(function (day, i) {
        if (day >= start == true && day <= ennd == true) {
            newArray.push(day);
            console.log(newArray);
        }
    });
}



