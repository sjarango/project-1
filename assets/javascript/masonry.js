// SETUP VARIABLES

var apiKey = "&api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze";

var sol = "";
var cam = $("#camera-select").val();
var rov = $("#rov").val();


var queryURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?" + "sol=" + sol + "&camera=" + cam + apiKey;


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
// This runQuery function expects two parameters:
// (the number of articles to show and the final URL to download data from)

function addImage(src,imgDiv){
   
    var img = $('<img>');
    img.addClass('d-block w-100');
    img.attr('src', src);
    img.attr('style', 'width:200px;');
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
                    imgDiv.addClass('carousel-item active');
                    addImage(src,imgDiv);
                   
                }
                else {
                    imgDiv.addClass('carousel-item');
                    addImage(src,imgDiv);
                    
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


// function calenDar (rov,cam) {
//     $('#datetimepicker6').datetimepicker({
//         defaultDate: enabledDates[r].cameras[cam][0],
//         enabledDates: enabledDates[r].cameras[cam]
//     });
// }


//   // If the user provides a startYear -- the startYear will be included in the queryURL
//   if (parseInt(startYear)) {
//     searchURL = searchURL + "&begin_date=" + startYear + "0101";
//   }

//   // If the user provides a startYear -- the endYear will be included in the queryURL
//   if (parseInt(endYear)) {
//     searchURL = searchURL + "&end_date=" + endYear + "0101";
//   }

//   // Then we will pass the final searchURL and the number of results to
//   // include to the runQuery function
//   runQuery(numResults, searchURL);
// });

// // This button clears the top articles section
// $("#clear-all").on("click", function() {
//   articleCounter = 0;
//   $("#well-section").empty();
// });



//   // Number of results the user would like displayed
//   numResults = $("#num-records-select").val();

//   // Start Year
//   startYear = $("#start-year").val().trim();

//   // End Year
//   endYear = $("#end-year").val().trim();