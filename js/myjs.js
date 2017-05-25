// DARK SKY API
$(document).ready(function() {
   var weatherIcon = {
      // ICONS OBJECT
      clearday: "https://cdn3.iconfinder.com/data/icons/weather-16/256/Sunny_day-128.png",
      clearnight: "https://cdn3.iconfinder.com/data/icons/weather-16/256/Clear_Night-128.png",
      rain: "https://cdn3.iconfinder.com/data/icons/weather-16/256/Rainy_Day-128.png",
      snow: "https://cdn3.iconfinder.com/data/icons/weather-16/256/Snow-128.png",
      sleet: "https://cdn1.iconfinder.com/data/icons/weather-forecast-meteorology-color-1/128/weather-sleet-128.png",
      wind: "https://cdn3.iconfinder.com/data/icons/weather-16/256/High_Wind-128.png",
      fog: "https://cdn4.iconfinder.com/data/icons/weather-line-set/24/icn-weather-fog-128.png",
      cloudy: "https://cdn3.iconfinder.com/data/icons/weather-16/256/Clouds-128.png",
      partlycloudyday: "https://cdn3.iconfinder.com/data/icons/weather-16/256/Cloudy_Day-128.png",
      partlycloudynight: "https://cdn3.iconfinder.com/data/icons/weather-91/64/1-18-128.png",
      thunderstorm: "https://cdn3.iconfinder.com/data/icons/weather-16/256/Storm-128.png",
      tornado: "https://cdn3.iconfinder.com/data/icons/weather-16/256/Tornado-128.png"
   };

   function getLocation() {
      // create geolocation object
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(showWeather);
      } else {
         $("#location").html("Geolocation is not supported by this browser.");
      }
   }

   function showWeather(position) {
      var currentLat = position.coords.latitude;
      var currentLon = position.coords.longitude;
      var loc = currentLat + "," + currentLon;

      $.getJSON("https://ipinfo.io/json", function showCity(response) {
         // using IP info API to access city, country
         let city = response.city;
         let country = response.country;
         $("#location").html(city + ", " + country);
      }).fail(function(jqXHR, textStatus, errorThrown) {
         alert("getJSON request failed! " + textStatus);
      });

      $.getJSON(
         //using DARK SKY API to show weather
         "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d8f6f13949d4ae99101c206506c5f6d7/" + loc,
         function(data) {
            //get weather
            let weather = data.currently.summary;
            let temperature = data.currently.temperature;
            let tempF = Math.round(temperature); //default unit is F not C
            let tempC = Math.round((tempF - 32) * 5 / 9);
            let iconName = data.currently.icon.replace(/-/g, "");
            let iconImg = weatherIcon[iconName];


            //weather description display
            $("#weather").html(weather);
            //temperature display
            $("#temperature").html(tempF);
            //weather icon display
            $("#weather-icon").attr("src", iconImg);
            $("#test").html(iconName);

            $("#btnF").click(function() {
               //change to F degree by click btnF
               $("#btnF").css("background", "#DDDDDD");
               $("#btnC").css("background", "#9b9b9b");
               $("#temperature").html(tempF);
            });

            $("#btnC").click(function() {
               //change to C degree by click btnC
               $("#btnC").css("background", "#DDDDDD");
               $("#btnF").css("background", "#9b9b9b");
               $("#temperature").html(tempC);
            });
         }
      ).fail(function(jqXHR, textStatus, errorThrown) {
         alert("getJSON request failed! " + textStatus);
      });
   }

   getLocation();
});
