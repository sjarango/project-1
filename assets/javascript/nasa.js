
//----------------Set Variables--------------------
 //Nasa API Key
 var apiKey = "6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze";
 // Create an AJAX call to retrieve data

var curiosURL =
     'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?camera=fhaz&api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze&earth_date=2019-09-18';

var opposURL =
     'https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?camera=fhaz&api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze&earth_date=2017-06-09';

     var spiritURL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?camera=fhaz&api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze&earth_date=2008-02-09';


     $.ajax({
     url: curiosURL,
     method: "GET"
 }).then(function (response) {
     var curioFhazImg = response.photos[0].img_src;
     var curioFhazTitle = response.photos[0].camera.full_name;
     var curioFhazEDate = response.photos[0].earth_date;
     var curioFhazRover = response.photos[0].rover.name;
     var curioFhazLaunch = response.photos[0].rover.launch_date;
     var curioFhazLanding = response.photos[0].rover.landing_date;
     $('#curiosity').attr('src',curioFhazImg);
     $('#curiosity-title').text(curioFhazTitle);
     $('#curiosity-EDate').text('Earth Date: ' + curioFhazEDate);
     $('#curiosity-Rover').text('Rover: ' + curioFhazRover);
     $('#curiosity-Launch').text('Launch Date: ' + curioFhazLaunch);
     $('#curiosity-Landing').text('Landing Date: ' + curioFhazLanding);

 });

 $.ajax({
    url: opposURL,
    method: "GET"
}).then(function (response) {
    var oppoFhazImg = response.photos[0].img_src;
    console.log(oppoFhazImg);
     var oppoFhazTitle = response.photos[0].camera.full_name;
     var oppoFhazEDate = response.photos[0].earth_date;
     console.log(oppoFhazEDate);
     var oppoFhazRover = response.photos[0].rover.name;
     var oppoFhazLaunch = response.photos[0].rover.launch_date;
     var oppoFhazLanding = response.photos[0].rover.landing_date;
     $('#opportunity').attr('src',oppoFhazImg);
     $('#oppo-title').text(oppoFhazTitle);
     $('#oppo-EDate').text('Earth Date: ' + oppoFhazEDate);
     $('#oppo-Rover').text('Rover: ' + oppoFhazRover);
     $('#oppo-Launch').text('Launch Date: ' + oppoFhazLaunch);
     $('#oppo-Landing').text('Landing Date: ' + oppoFhazLanding);
});

$.ajax({
    url: spiritURL,
    method: "GET"
}).then(function (response) {
    var spiritFhazImg = response.photos[0].img_src;
    console.log(spiritFhazImg);
     var spiritFhazTitle = response.photos[0].camera.full_name;
     var spiritFhazEDate = response.photos[0].earth_date;
     console.log(spiritFhazEDate);
     var spiritFhazRover = response.photos[0].rover.name;
     var spiritFhazLaunch = response.photos[0].rover.launch_date;
     var spiritFhazLanding = response.photos[0].rover.landing_date;
     $('#spirit').attr('src',spiritFhazImg);
     $('#spirit-title').text(spiritFhazTitle);
     $('#spirit-EDate').text('Earth Date: ' + spiritFhazEDate);
     $('#spirit-Rover').text('Rover: ' + spiritFhazRover);
     $('#spirit-Launch').text('Launch Date: ' + spiritFhazLaunch);
     $('#spirit-Landing').text('Landing Date: ' + spiritFhazLanding);
});

var apod = moment().subtract(1,'days').format('YYYY-MM-DD');
 
 var apodURL =  'https://api.nasa.gov/planetary/apod?api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze&date=' + apod;
 $.ajax({
    url: apodURL,
    method: "GET"
}).then(function (response) {
    var apodImg = response.url;
    var apodExpl = response.explanation;
    var apodTitle = response.title;
    $('#apod').attr('src',apodImg);
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



