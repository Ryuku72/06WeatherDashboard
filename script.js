//enable JQUERY
$(document).ready(function () {

  renderUserInput();

  // clear search box
  function clear() {
    $(".search").empty();
    $("#error").empty();
  }

  // click button add results to search feild
  $('button').click(function (event) {
    event.preventDefault();
    clear();
    $('#searchText').val($(this).val())
    startSearch();
  });

  //press enter and update previous search results
  $("#searchText").keypress(function (event) {
    if (event.which == 13) {
      event.preventDefault();

      //add search value to the array then localstorage
      var previousInput = JSON.parse(window.localStorage.getItem('userData'));
      console.log(previousInput);

      var weatherData = [];
      weatherData = JSON.parse(localStorage.getItem('userData')) || [];
      weatherData.unshift($("#searchText").val().trim());
      console.log(weatherData);
      if (weatherData.length > 5) {
        weatherData.length = 5;
      }
      localStorage.setItem('userData', JSON.stringify(weatherData));

      $("#previous-results").empty();

      for (var i = 0; i < weatherData.length; i++) {
        var resultEl = document.createElement("button");
        resultEl.textContent = weatherData[i];
        resultEl.value = weatherData[i];
        resultEl.style.margin = "2px";
        resultEl.style.height = "6vh";
        resultEl.style.borderRadius = "10px";
        $("#previous-results").append(resultEl);
      }
    }

    $('button').click(function (event) {
      event.preventDefault();
      clear();
      $('#searchText').val($(this).val())
    });

  });

  function renderUserInput() {
    var previousInput = JSON.parse(window.localStorage.getItem('userData'));

    if (previousInput == null) {
      var tempInput = ["Perth, AU"];
      var resultEl = document.createElement("button");
      resultEl.textContent = tempInput;
      resultEl.value = tempInput;
      resultEl.style.margin = "2px";
      resultEl.style.height = "6vh";
      resultEl.style.borderRadius = "10px";
      $("#previous-results").append(resultEl);
    } else {
      // Render a new button for each previousInput
      for (var i = 0; i < previousInput.length; i++) {
        var resultEl = document.createElement("button");
        resultEl.textContent = previousInput[i];
        resultEl.value = previousInput[i];
        resultEl.style.margin = "2px";
        resultEl.style.height = "6vh";
        resultEl.style.borderRadius = "10px";
        $("#previous-results").append(resultEl);
      }
    }
  };

  //submit API request with enter button
  $("#searchText").keypress(function (event) {
    if (event.which == 13) {
      event.preventDefault();
      startSearch();
    }
  });

  function startSearch(event) {

    clear();

    function buildQueryURL() {
      // Query begins as an array
      var queryParams = {};

      // URL we need to query the database
      var queryURL = "https://api.openweathermap.org/data/2.5/forecast?";

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
        error: function () {
          $("#error").html("#Error404: No Such Location")
        }
      })

      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {

        // Log the resulting object
        console.log(response);

        $("#today").removeClass('hide');
        $("#future").removeClass('hide');
        $("#logo").removeClass('hide');

        clear();

        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date();
        var dayName = days[d.getDay()];
        //console.log(dayName);

        function populateData() {

          // Transfer content to HTML
          $(".location").text(response.city.name);
          $(".date1").text(dayName);
          $(".weatherCon").text("Conditions: " + response.list[0].weather[0].main);
          $(".wind").text("Wind Speed: " + response.list[0].wind.speed + "m/sec");
          $(".humidity").text("Humid: " + response.list[0].main.humidity + "%");

          // Converts the temp to Celsus with the below formula
          $(".temp1").html(response.list[0].main.temp + "&deg;C");

          //UV index Query
          function UVsearch() {
            var queryParams = {};
            queryParams.lat = response.city.coord.lat;
            queryParams.lon = response.city.coord.lon;
            queryParams.appid = "0abab2ed9c93a0d35e95bde6214af737";

            var queryUV = "https://api.openweathermap.org/data/2.5/uvi?";

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


          //Day 2 - 5 Temp & Humidity
          $(".date2").text(days[d.getDay() + 1]);
          $(".temp2").html("Temp: " + response.list[1].main.temp + "&deg;C");
          $(".humid2").text("Humidity: " + response.list[1].main.humidity + "%");

          $(".date3").text(days[d.getDay() + 2]);
          $(".temp3").html("Temp: " + response.list[2].main.temp + "&deg;C");
          $(".humid3").text("Humidity: " + response.list[2].main.humidity + "%");

          $(".date4").text(days[d.getDay() + 3]);
          $(".temp4").html("Temp: " + response.list[3].main.temp + "&deg;C");
          $(".humid4").text("Humidity: " + response.list[3].main.humidity + "%");

          $(".date5").text(days[d.getDay() + 4]);
          $(".temp5").html("Temp: " + response.list[4].main.temp + "&deg;C");
          $(".humid5").text("Humidity: " + response.list[4].main.humidity + "%");

          //Day Weather Icons
          var weatherIcon1 = response.list[0].weather[0].icon;
          $(".img1").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon1 + "@2x.png");
          var weatherIcon2 = response.list[1].weather[0].icon;
          $(".img2").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon2 + "@2x.png");
          var weatherIcon3 = response.list[2].weather[0].icon;
          $(".img3").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon3 + "@2x.png");
          var weatherIcon4 = response.list[3].weather[0].icon;
          $(".img4").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon4 + "@2x.png");
          var weatherIcon5 = response.list[4].weather[0].icon;
          $(".img5").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon5 + "@2x.png");

        }

        populateData();
      });
  };
});
