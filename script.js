//lets have a clock
updateClock();
updateDate();

function updateClock () {
  var currentTime = new Date ();
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  var currentSeconds = currentTime.getSeconds();


  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

  // Choose either "AM" or "PM" as appropriate
  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

  // Convert the hours component to 12-hour format if needed
  currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  // Compose the string for display
  var currentTimeString =  currentHours + ":" + currentMinutes + ":"+ currentSeconds +" "+ timeOfDay;

  // Update the time display
  document.getElementById("clock").innerText = currentTimeString;
}

function updateDate() {
  var currentTime = new Date ();
  var currentMonth = currentTime.getMonth(); 
  
  //Convert the month component to text month
  currentMonth = ( currentMonth == 0 ) ? "January" : currentMonth;
  currentMonth = ( currentMonth == 1 ) ? "February" : currentMonth;
  currentMonth = ( currentMonth == 2 ) ? "March" : currentMonth;
  currentMonth = ( currentMonth == 3 ) ? "April" : currentMonth;
  currentMonth = ( currentMonth == 4 ) ? "May" : currentMonth;
  currentMonth = ( currentMonth == 5 ) ? "June" : currentMonth;
  currentMonth = ( currentMonth == 6 ) ? "July" : currentMonth;
  currentMonth = ( currentMonth == 7 ) ? "August" : currentMonth;
  currentMonth = ( currentMonth == 8 ) ? "September" : currentMonth;
  currentMonth = ( currentMonth == 9 ) ? "October" : currentMonth;
  currentMonth = ( currentMonth == 10) ? "November" : currentMonth;
  currentMonth = ( currentMonth == 11) ? "December" : currentMonth;
  
  var currentDate = currentTime.getDate();
  
  // Add suffix to the date
  currentDate = ( currentDate == 1 || currentDate == 21 || currentDate == 31 ) ? currentDate + "st" : currentDate;
  currentDate = ( currentDate == 2 || currentDate == 22 ) ? currentDate + "nd" : currentDate;
  currentDate = ( currentDate == 3 ) || currentDate == 23 ? currentDate + "rd" : currentDate;
  currentDate = ( currentDate > 3 || currentDate < 21 || currentDate > 23 || currentDate < 31 ) ? currentDate + "th" : currentDate;

  var todaysDate = currentMonth +  " " + currentDate;

  // Update the time display
  document.getElementById("dateSet").innerText = todaysDate;
}

//enable JQUERY
$(document).ready(function () {

  renderUserInput();

  // clear search box
  function clear() {
    $(".search").empty();
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
          $("#searchText").val("#Error404 : No Such Location"),
          $("#searchText").css("color", "red")
        }
      })

      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {

        // Log the resulting object
        console.log(response);

        $("#today").removeClass('hide');
        $("#future").removeClass('hide');
        $("#dateSet").removeClass('hide');

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
          $(".wind").text("Wind: " + response.list[0].wind.speed + "m/sec");
          $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");

          // Converts the temp to Celsus with the below formula
          $(".temp1").html(response.list[0].main.temp + "&deg;C");

          if (response.list[0].main.temp >= 25) {
            $(".temp1").css('color', 'red');
          }
          if (response.list[0].main.temp < 25 ){
            $(".temp1").css('color', 'orange');
          } 
          if (response.list[0].main.temp <= 15 ){
            $(".temp1").css('color', 'blue');
          } 

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


