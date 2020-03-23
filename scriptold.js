//enable JQUERY
$(document).ready(function() {

renderUserInput();

// clear search box
function clear() {
  $(".search").empty();
  $("#error").empty();
}

$("#search-Btn").on("click", function (event) {
event.preventDefault();

//add search value to the array then localstorage
var previousInput = JSON.parse(window.localStorage.getItem('userData'));
console.log(previousInput);

var weatherData = [];
weatherData = JSON.parse(localStorage.getItem('userData')) || [];
weatherData.unshift($("#searchText").val().trim());
if (weatherData.length > 5) {
  weatherData.length = 5;
}
localStorage.setItem('userData', JSON.stringify(weatherData));

$(".previous-results").empty();

for (var i = 0; i < weatherData.length; i++) {
  var li = document.createElement("li");
  li.textContent = weatherData[i];
  $(".previous-results").append(li);
  }

});

function renderUserInput() {
var previousInput = JSON.parse(window.localStorage.getItem('userData'));

  if (previousInput == null)  {
    var tempInput = ["Perth, AU"];
    var li = document.createElement("li");
    li.textContent = tempInput;
    $(".previous-results").append(li);
  } 

  else {
  // Render a new li for each previousInput
  for (var i = 0; i < previousInput.length; i++) {
  var li = document.createElement("li");
  li.textContent = previousInput[i];
  $(".previous-results").append(li);
  }}

};

//submit API request with button click
  $("#search-Btn").on("click", function (event) {
    event.preventDefault();
    clear();

    function buildQueryURL() {
      // Query begins as an array
      var queryParams = {};

      // URL we need to query the database
      var queryURL = "http://api.openweathermap.org/data/2.5/forecast?";

      // search results
      queryParams.q = $("#searchText")
        .val()
        .trim();

      // Query settings
      queryParams.appid = "0abab2ed9c93a0d35e95bde6214af737";
      queryParams.cnt = 5;
      queryParams.units = "metric";

      //console.log(queryURL + $.param(queryParams));
      return queryURL + $.param(queryParams)
    }

    var queryURL = buildQueryURL();
    console.log(queryURL);

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET",
        datatype: "jsonp",
        timeout: 5000,
        error: function () {
          $("#error").html("Error: No such location")
        }
      })

      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {

        // Log the resulting object
        console.log(response);
      
        clear();

        function populateData() {
          // Transfer content to HTML
          $(".location").text(response.city.name + " Weather Details");
          $(".wind").text("Wind Speed: " + response.list[0].wind.speed + "m/sec");
          $(".humidity").text("Humid: " + response.list[0].main.humidity + "%");

          // Converts the temp to Celsus with the below formula
          $(".temp").html("Temperature: " + response.list[0].main.temp + "&deg;C");

          //UV index Query
          function UVsearch() {
            var queryParams = {};
            queryParams.lat = response.city.coord.lat;
            queryParams.lon = response.city.coord.lon;
            queryParams.appid = "0abab2ed9c93a0d35e95bde6214af737";

            var queryUV = "http://api.openweathermap.org/data/2.5/uvi?";

            return queryUV + $.param(queryParams);
          }

          var queryURL = UVsearch();
          $.ajax({
              url: queryURL,
              method: "GET"
            })
            .then(function (response) {
              console.log(queryURL);
              console.log(response);

              // Transfer content to HTML
              $(".uvIndex").text("UV Index: " + response.value);
            });


          function weatherIcon1() {
            //create an img and give the attribute a src.
            var weatherIcon = response.list[0].weather[0].icon;
            var imgEl = $("<img>");
            var imgURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            imgEl.attr("src", imgURL);
            $(".location").append(imgEl);
          }

          weatherIcon1();


          //Day 2 - 5 Temp & Humidity

          $(".temp2").html("Temperature: " + response.list[1].main.temp + "&deg;C");
          $(".humid2").text("Humidity: " + response.list[1].main.humidity + "%");

          $(".temp3").html("Temperature: " + response.list[2].main.temp + "&deg;C");
          $(".humid3").text("Humidity: " + response.list[2].main.humidity + "%");

          $(".temp4").html("Temperature: " + response.list[3].main.temp + "&deg;C");
          $(".humid4").text("Humidity: " + response.list[3].main.humidity + "%");

          $(".temp5").html("Temperature: " + response.list[4].main.temp + "&deg;C");
          $(".humid5").text("Humidity: " + response.list[4].main.humidity + "%");

          //Day 2 - 5 Icons
          var weatherIcon2 = response.list[1].weather[0].icon;
          $(".img2").attr("src", "http://openweathermap.org/img/wn/" + weatherIcon2 + "@2x.png");
          var weatherIcon3 = response.list[2].weather[0].icon;
          $(".img3").attr("src", "http://openweathermap.org/img/wn/" + weatherIcon3 + "@2x.png");
          var weatherIcon4 = response.list[3].weather[0].icon;
          $(".img4").attr("src", "http://openweathermap.org/img/wn/" + weatherIcon4 + "@2x.png");
          var weatherIcon5 = response.list[4].weather[0].icon;
          $(".img5").attr("src", "http://openweathermap.org/img/wn/" + weatherIcon5 + "@2x.png");

        }

        populateData();
      });
  });
});