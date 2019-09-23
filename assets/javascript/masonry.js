// // init Masonry
// var $grid = $('.grid').masonry({
//     itemSelector: '.grid-item',
//     percentPosition: true,
//     columnWidth: '.grid-sizer'
//   });

//   // layout Masonry after each image loads
//   $grid.imagesLoaded().progress( function() {
//     $grid.masonry();
//   });

// SETUP VARIABLES

var apiKey = "&api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze";

var sol = "";
var cam = $("#camera-select").val();
var rov = $("#rov").val();

//Note mardi is unique. only data on sol 100-curiosity

var queryURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?" + "sol=" + sol + "&camera=" + cam + apiKey;

// Counter to keep track of article numbers as they come in
var articleCounter = 0;

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
        if (photos !== 0) {
            for (i = 0; i < photos; i++) {
                var src = response.photos[i].img_src;
                var imgDiv = $('<div>')
                if (i == 0) {
                    imgDiv.addClass('carousel-item active');
                    addImage(src,imgDiv);
                   
                }
                else {
                    imgDiv.addClass('carousel-item');
                    addImage(src,imgDiv);
                    
                }

            }

        }
        else if(photos == 0) {
            var errDiv = $('<div>').addClass('col-6 text-center');
            var hDiv = $('<h3>');
            var hDiv2 = $('<h4>');
            hDiv.text('No Images For This Selection');
            hDiv2.text('Try A Different Sol, Date or Camera View');
            errDiv.append(hDiv, hDiv2);

        }

    });
}

// // Loop through and provide the correct number of articles
// for (var i = 0; i < numArticles; i++) {

//   // Add to the Article Counter (to make sure we show the right number)
//   articleCounter++;

//   // Create the HTML well (section) and add the article content for each
//   var wellSection = $("<div>");
//   wellSection.addClass("well");
//   wellSection.attr("id", "article-well-" + articleCounter);
//   $("#well-section").append(wellSection);

//   // Confirm that the specific JSON for the article isn't missing any details
//   // If the article has a headline include the headline in the HTML
//   if (NYTData.response.docs[i].headline !== "null") {
//     $("#article-well-" + articleCounter)
//       .append(
//         "<h3 class='articleHeadline'><span class='label label-primary'>" +
//         articleCounter + "</span><strong> " +
//         NYTData.response.docs[i].headline.main + "</strong></h3>"
//       );

//     // Log the first article's headline to console
//     console.log(NYTData.response.docs[i].headline.main);
//   }

//   // If the article has a byline include the headline in the HTML
//   if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
//     $("#article-well-" + articleCounter)
//       .append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");

//     // Log the first article's Author to console.
//     console.log(NYTData.response.docs[i].byline.original);
//   }

//   // Then display the remaining fields in the HTML (Section Name, Date, URL)
//   $("#articleWell-" + articleCounter)
//     .append("<h5>Section: " + NYTData.response.docs[i].section_name + "</h5>");
//   $("#articleWell-" + articleCounter)
//     .append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
//   $("#articleWell-" + articleCounter)
//     .append(
//       "<a href='" + NYTData.response.docs[i].web_url + "'>" +
//       NYTData.response.docs[i].web_url + "</a>"
//     );

//   // Log the remaining fields to console as well
//   console.log(NYTData.response.docs[i].pub_date);
//   console.log(NYTData.response.docs[i].section_name);
//   console.log(NYTData.response.docs[i].web_url);
// }






// METHODS ==========================================================

// // on.("click") function associated with the Search Button
$("#run-search").on("click", function (event) {
    event.preventDefault();


    $("#images").empty();

    // Grabbing text the user typed into the search input
    sol = $('#sol').val();
    cam = $("#camera-select").val();
    rov = $("#rov").val();

    var searchURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rov + "/photos?" + "sol=" + sol + "&camera=" + cam + apiKey;
    searchPhotos(searchURL);
});
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