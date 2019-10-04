$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    $(".symbol").text("Symbol: " + response.symbol);
    $(".name").text("Name:" + response.companyName);
    $(".lastPx").text("Last Price: " + response.latestPrice);
    $(".mktcap").text("Industry: " + response.marketCap);
});

$.ajax({
    url: queryURL2,
    method: "GET"
}).then(function (response2) {
   
     hd.push(response2);
    // for (i = 0;i<hd.length;i++){
    //     var dates = hd[i].date;
    //     var prices = hd[i].close;
    //     console.log(dates);
    // }
    
    });

Highcharts.getJSON(queryURL2, function (data) {
    console.log(data)
    hd2 = data;
    var forHC = data.map(it => [new Date(it.date).getTime(), it.close])
    // var forHC = data.map(function(it) {return [new Date(it.date).getTime(), it.close];})

    for (i = 0;i<hd2.length;i++){
        var dates = hd2[i].date;
        var prices = hd2[i].close;
        console.log(prices);
    }
    Highcharts.stockChart('firstchart', {


        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'AA Stock Price'
        },

        series: [{
            name: 'AA',
            data: forHC,
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
});

</script>
