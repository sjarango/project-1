//Global Variables

var apiKey = "&api_key=6ahnRsSlhvpPlehhB0fMzpoCmPoENxdPYX8NLcze";
var intro = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
var rov = "";
var cam = "";
var r ;
rovCams=[];

var imgFest = [

    {
        roverName: "",      // Variable set from rover selector value
        r: "",
        camera: "",
        dates: {
        }
    }
];

var images = [];
var camname = "";
var earDate = "";
var newArray = [];


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




//---On Change Event Functions---//

//-----Rover Selector-----//
$('#rov').change(function () {
    rov = $('#rov').val();              //When the rover value changes, this will also set the possible date arrays
    $('#camera-select').empty();            //Clear the current camera selections which are dictated by the rover
    $('#sDate').empty();                    //Make sure the start date is empty
    $('#eDate').empty();                    //Make sure the end date is empty
    $('#camsavail').empty();                //Clear the information container
    sessionStorage.removeItem('images');    //Clear session storage variables used to transfer data    
    sessionStorage.removeItem('dates');
    
    camPair(rov);                              //Once the rover value is set by the user, information specific to that rover is called to the foreground
    return rov;
});

 //-----This function assigns text value to numerical ordering of object-----//
function camPair(rov) {         
                                  
    if (enabledDates[0].roverName.toLowerCase() == rov) {
    r = 0;
    }
    else if(enabledDates[1].roverName.toLowerCase() == rov) {
    r = 1;
    }
    else {
    r = 2;
    }
    console.log("r:" + r);
    console.log("rover name:" + enabledDates[r].roverName);

    var camL = Object.keys(enabledDates[r].cameras).length;     //---Given the number of cameras available for the rover
    var keyS = Object.keys(enabledDates[r].cameras);            //---and the names of the cameras
    for (var e = 0; e < camL; e++) {                            //---cycle through all the cameras
        var camy = keyS[e];
        if (enabledDates[r].cameras[camy].length !== 0) {       //---determine if images exist on that camera
            rovCams.push(camy);
            enabledDates[r].photos[camy].push(enabledDates[r].cameras[camy].length);                                 //---push the cameras that have data to the dropdown variable used for camera selection
        }
    }
    
    addCamOpts(rovCams);
    return r;

}

function addCamOpts(rovCams){
    var opt1 =$('<option selected disabled>');
    opt1.attr('value','');
    opt1.text('Select Camera');
    $('#camera-select').append(opt1);
    for (var h = 0; h < rovCams.length; h++) {
        var opt = $('<option>');
        opt.attr('value', rovCams[h]);
        opt.text(rovCams[h]);
        $('#camera-select').append(opt);
    }
}
//-----Camera Selector-----//
$("#camera-select").on('change', function () {                      //Not all dates are available for each camera so depending on the 
    cam = $("#camera-select").val();
    $('#camsavail').empty();                                        //rover and camera selection a new date array is assigned.  The big exception is 
    sessionStorage.removeItem('dates');
    $('#sDate').empty();                                            //Spirit rover.  The dates available for each camera is present in the rover manifest
    $('#eDate').empty();                                            //which is convenient because ,000's of api calls are spared in order to get the full
                                                                    //date array. For the Spirit rover the earth_date is not present in the manifest, but 
                                                                    //martian day(sol) is made available, which is used instead of earth_date.
    
    var dAtes = enabledDates[r].cameras[cam];
    sessionStorage.setItem("dates", JSON.stringify(dAtes));

    for (var f = 0; f < dAtes.length; f++) {               //The camera selection dictates the dates available
        var opt = $('<option>');                           //opt = start date
        var opt2 = $('<option>');                          //opt2 = end date
        opt.attr('value', dAtes[f]);
        opt2.attr('value', dAtes[f]);
        if (rov !== "spirit"){
        opt.text(moment(dAtes[f]).format('MM/DD/YY'));
        opt2.text(moment(dAtes[f]).format('MM/DD/YY'));
        }
        else{
            opt.text(dAtes[f]);
            opt2.text(dAtes[f]);
        }
        $('#sDate').append(opt);
        $('#eDate').append(opt2);
    }

    var camName = $('<h3>').attr('id', cam);
    camName.text("The " + cam + " camera has " + dAtes.length + " days with images starting " + moment(dAtes[0]).format('MM/DD/YY') + " and ending " + moment(dAtes[dAtes.length - 1]).format('MM/DD/YY'));
    $('#camsavail').append(camName);

});

//-----Date Selector-----//
$('#eDate').on('change', function () {                          //---Once the end date is set, the rover, camera and date arrays can be used to query the api
    var start = $('#sDate').val();
    var ennd = $('#eDate').val();
    var dateArray = JSON.parse(sessionStorage.getItem("dates"));//---This is the array of all the dates possible for this rover & camera pair
    btw(start, ennd, dateArray);                                //---Find the array of dates selected
    $('jumbotron').removeClass('d-none');                       //---Show the container that gives basic information about the rover,camera and images.
    var rovName = $('<h3>');

    clear("space");
    clear("earth");

    display_article("astronomy", "space", ennd);
    display_article("earth", "earth", ennd);

});

//-----Submit Query Button-----//
$("#run-search").on("click", function (event) {
    event.preventDefault();
    $("#images").empty();
    $("#mars").removeClass('d-none');
    getFotos(newArray);

    // var searchURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rov + "/photos?earth_date=" + eDate + "&camera=" + cam + apiKey;
    // searchPhotos(searchURL);

});

function clear(divID) {
    $("#" + divID + "-article-name").empty();
    $("#" + divID + "-article-abstract").empty();
    $("#" + divID + "-article-link").empty();
    $("#" + divID + "-error-message").empty();
}

// ajax function to display nyt article
function display_article (topic, divID, dob) {

    var key = "yJPyDNx7A7KgghCqQtWgVTgqXOGuvYro";
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + topic + "&begin_date=" + dob + "&end_date=" + dob + "&api-key=" + key;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        console.log(response);
        var results = response.response;

        if (results.docs === undefined || results.docs.length == 0) {
            // array empty or does not exist
            console.log("No articles found");
            var error = "<h4>No Articles Found</h4>"
            $("#" + divID + "-error-message").html(error);
        }
        else {
            // Gets article name
            var title = results.docs[0].headline.main;
            var abstract = results.docs[0].abstract;
            var link = results.docs[0].web_url;

            console.log(title);
            console.log(abstract);
            console.log(link);

            var nameHTML = "<h2>" + title + "</h2>";
            var abstractHTML = "<p>" + abstract + "</p>";

            var linkHTML = 
            `<a href="${link}" class="btn btn-info ">Read Article</a>`;


            $("#" + divID + "-article-name").html(nameHTML);
            $("#" + divID + "-article-abstract").html(abstractHTML);
            $("#" + divID + "-article-link").html(linkHTML);
        }
    });

}



//-----Reset Button-----//
$("#reset-search").on("click", function (event) {
    
    
    addRovOpts(enabledDates);
    addCamOpts(rovCams);
    $('#images').empty();
    $('#sDate').empty();
    $('#eDate').empty();
   
    
    $('#camsavail').empty();
    newArray =[];
    images = [];
    $("#mars").addClass('d-none');
    sessionStorage.removeItem('images');
    sessionStorage.removeItem('dates'); 
    addRovOpts(roverPull);
});



//---Multiple Image API Query Function---//
function getFotos(datearray) {                          //--Given the available dates, run an array of calls
    // var rov = $("#rov").val();                          //--use the rover and camera values to run the queries
    var cam = $("#camera-select").val();
    
    var calls = datearray.map(it => {
        return $.ajax({
            url: intro + rov + "/photos?earth_date=" + it + "&camera=" + cam + apiKey,
            method: "GET",
        }).then(function (response) {  
            images.push(response.photos); 
       }); 
    });
    Promise.all(calls)
        .then(function () {
            sessionStorage.setItem('images', JSON.stringify(images)); 
            layImages();
        });
    }




//---Functions---//
var imgs=[];
var edtes = [];
var ids = [];

//---This function flattens the image data and then places the images in carousel HTML---//
function layImages() {
    var images = JSON.parse(sessionStorage.getItem('images'));
    var srcNum = images.length;
    
    for (var j = 0; j < srcNum; j++) {                  //--Multiple images can occur on each day--//
                                                        //'for each day, push each image to a flat image, date and id array'
        for (var l = 0; l < images[j].length;l++){
            var imgsOD = images[j][l];                  //imgsOD is 'images of the day' 
            imgs.push(imgsOD.img_src);
            edtes.push(imgsOD.earth_date);
            ids.push(imgsOD.id);                        //This should be 3 equal length arrays
            
        }
    }

    for (u = 0 ; u < images.length;u++){                //Place the image, date and image id into carousel
            var imgDiv = $('<div>');                    //<div class="carousel-item">                   (imgDiv)
            imgDiv.addClass('carousel-item');           //  <div class="col-12">                        (imgDiv2)
            var imgDiv2 = $('<div>');                   //      <img src="imgs[u]">                     (img)
            imgDiv2.addClass('col-12');                 //       <div class="carousel-caption">         (imgDiv3)
            var img = $('<img>');                       //           <h4>Earth Date: edtes[u]</h4>      (imgH4)
            img.attr('src', imgs[u]);                   //           <p>Image id: ids[u]</p>            (pTag)
            var imgDiv3 = $('<div>');                   //       </div>
            imgDiv3.addClass('carousel-caption');       //  </div>
            var imgH4 = $('<h4>');                      //</div>
            imgH4.text('Earth Date: ' + moment(edtes[u]).format('MM/DD/YY'));
            var pTag = $('<p>');
            pTag.text('Image id: ' + ids[u]);
            imgDiv3.append(imgH4,pTag);
            imgDiv2.append(img,imgDiv3);
            imgDiv.append(imgDiv2);
            $('#images').append(imgDiv);
       
       
        }
       
   
    var carItem = document.getElementsByClassName('carousel-item'); //Find the first carousel item and make it active
    carItem[0].classList.add('active');
}

//--This function finds the dates in the available date array--//
function btw(start, ennd, dateArray) {
    var diff = moment(ennd).diff(moment(start), 'days');
    dateArray.forEach(function (day, i) {
        if (day >= start == true && day <= ennd == true) {
            newArray.push(day);
        }
        return diff;
    });
}

//--This function is used for multiple image slide show--// 
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

