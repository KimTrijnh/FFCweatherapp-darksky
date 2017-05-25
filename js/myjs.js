// DARK SKY API
$(document).ready(function() {
   var weatherIcon = {
      // ICONS OBJECT
      clearday: "https://image.ibb.co/kBx4Lv/003_sun.png",
      clearnight: "https://image.ibb.co/hzpJfv/004_moon.png",
      rain: "https://image.ibb.co/dpuvSa/010_rain.png",
      snow: "https://image.ibb.co/eAqPLv/005_snowflake.png",
      sleet: "https://image.ibb.co/in9qtF/hail_1.png",
      wind: "https://image.ibb.co/fjs4Lv/009_windy.png",
      fog: "https://image.ibb.co/gdbg0v/haze.png",
      cloudy: "https://image.ibb.co/nAnh7a/008_cloudy.png",
      partlycloudyday: "https://image.ibb.co/nAnh7a/008_cloudy.png",
      partlycloudynight: "https://image.ibb.co/fGCtDF/002_cloudy_night.png",
      thunderstorm: "https://image.ibb.co/fD24Lv/001_storm.png",
      tornado: "https://image.ibb.co/m1pC7a/tornado_1.png"
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
