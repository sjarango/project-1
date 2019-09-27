// SETUP VARIABLES

var apiKey = "&api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze";
var rovCams = [];

// FUNCTIONS
// ==========================================================


function rowNum(length) {
    if (length % 7 !== 0) {
        rows = Math.floor(length / 7) + 1;
    }
    else {
        rows = length % 7;
    }
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
function addCamOpts(obj) {
        
        var camL = Object.keys(obj[g].cameras).length;
        var keyS = Object.keys(obj[g].cameras);
        for (var e = 0; e < camL; e++) {
            var camy = keyS[e];
            if (obj[g].cameras[camy].length !== 0) {
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

            for (i = 0; i < photos; i++) {
                var src = response.photos[i].img_src;
                var imgDiv = $('<div>');
                if (i == 0) {
                    imgDiv.addClass('carousel-item active col-6');
                    addImage(src, imgDiv);

                }
                else {
                    imgDiv.addClass('carousel-item col-6');
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
        eDate = $('#datetimepicker6').datetimepicker('viewDate').format('YYYY-MM-DD');
        cam = $("#camera-select").val();
        rov = $("#rov").val();

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
        addCamOpts(enabledDates);
        var dAtes = enabledDates[r].cameras[cam];

        console.log(dAtes);

        $('#datetimepicker6').datetimepicker({
            format: 'MM/DD/YYYY',
            defaultDate: dAtes[0],
            enabledDates: dAtes
        });
    });



$('#datetimepicker6').datetimepicker({
    format: 'MM/DD/YYYY',
    defaultDate: enabledDates[0].cameras.FHAZ[0],
    enabledDates: enabledDates[0].cameras.FHAZ
});


function camPair(){
    $('#camera-select').empty();
    if ($('#rov').val() == roverPull[0].name) {
        r = 0;
        sessionStorage.setItem('roverObj', JSON.stringify(enabledDates[0]));
        console.log(JSON.stringify(sessionStorage.rovObj));
    }
    else if ($('#rov').val() == roverPull[1].name) {
        r = 1;
        sessionStorage.setItem('roverObj', JSON.stringify(enabledDates[1]));
        console.log(JSON.stringify(sessionStorage.rovObj));
    }
    else {
        r = 2;
        sessionStorage.setItem('roverObj', JSON.stringify(enabledDates[2]));
        console.log(JSON.stringify(sessionStorage.rovObj));
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