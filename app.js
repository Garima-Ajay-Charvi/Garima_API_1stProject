//Quotation---
$(document).ready(function () {
    var randomNum;
    var randomQuote;
    var randomAuthor;
    function getQuote() {
        var url = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
        $.getJSON(url, function (data) {
            $(".quote").html('"' + data.quoteText + '"');
            $(".author").html("-" + data.quoteAuthor);
        });
    }
    $("#newQuote").on("click", function () {
        getQuote();
    });
    /*$(".quotes").animate(
        { opacity: 0 },
        500,
        function() {
          $(this).animate({ opacity: 1}, 500);
          $('#quote').text(randomQuote.quote);
          $('#author').text(randomQuote.quote);
        }
      );*/
});

//Date & Time ----
setInterval(showTime, 1000);
function showTime() {
    var date = new Date();
    var din = date.getDate();
    var mahina = date.getMonth() + 1;//1 is added since this method reads months as a number from 0 to 11.
    var saal = date.getFullYear();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var session = "AM"
    if (h == 0) {
        h = 12;
    }
    if (h > 12) {
        h = h - 12;
        session = "PM"
    }
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    var tarik = din + "/" + mahina + "/" + saal;
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("myClockDisplay").innerHTML = tarik + " " + " " + " " + " " + time;
};
showTime();

//LOCAL_WEATHER----
$(document).ready(function () {
    // Get Location
    navigator.geolocation.getCurrentPosition(sucess, error);
    function sucess(pos) {
        var lat = pos.coords.latitude;
        var long = pos.coords.longitude;
        weather(lat, long);
    }
    function error() {
        console.log('error');
    }
    function weather(lat, long) {
        var url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;
        $.getJSON(url, function (data) {
            console.log(data);
            updateDOM(data);
        });
    }
    function updateDOM(data) {
        var city = data.name;
        var temp = Math.round(data.main.temp);
        var desc = data.weather[0].description;
        var icon = data.weather[0].icon;
        var pressure = Math.round(data.main.pressure);
        var wind = Math.round(data.wind.speed);
        var rain = data.rain;
        $("#city").html(city);
        $("#temp").html(temp);
        $("#desc").html(desc);
        $("#icon").attr('src', icon);
        $("#pressure").html(pressure);
        $("#wind").html(wind);
        $("#rain").html(rain);
    }
});
//CITY_WEATHER-------

$(document).ready(function () {
    $("#newCity").click(function () {
        var city = $("#searchCity").val();
        var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric' +
            '&appid=6b9fa96839b340590526fdf6c435ef7d';
        $.getJSON(url, function (data) {
            // console.log(data);
            updateDOM(data);
        });
        function updateDOM(data) {
            var city = data.name;
            var temp = Math.round(data.main.temp);
            var desc = data.weather[0].description;
            var icon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            var pressure = Math.round(data.main.pressure);
            var wind = Math.round(data.wind.speed);
            var rain = data.rain;
            $("#city2").html(city);
            $("#temp2").html(temp);
            $("#desc2").html(desc);
            $("#icon2").attr('src', icon);
            $("#pressure2").html(pressure);
            $("#wind2").html(wind);
            $("#rain2").html(rain);
        };
    });
});

