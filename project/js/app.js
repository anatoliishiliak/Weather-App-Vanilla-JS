window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");

  let locationTimezone = document.querySelector(".location-timezone");

  let iconDisplay = document.querySelector(".icon");

  let degreeSection = document.querySelector(".degree-section");

  let degreeIcon = document.querySelector(".degree-section span");

  let input = document.querySelector("input");
  let city;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const apiLocal = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9f4f41bc3e58defc7ee39e089710e216&units=metric`;

      fetch(apiLocal)
        .then((responce) => {
          return responce.json();
        })
        .then((data) => {
          console.log(data);
          const temp = data.main.temp;
          const tempDescription = data.weather[0].description;
          const iconId = data.weather[0].icon;
          const timezone = data.name;

          //set DOM elements from the API
          temperatureDescription.textContent =
            capitalizeFirstLetter(tempDescription);
          locationTimezone.textContent = timezone;
          temperatureDegree.textContent = Math.round(temp);
          iconDisplay.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`;

          // change celsius to farenheit and back onklick

          let farenheitFormula = Math.round(temp) * 1.8 + 32;

          degreeSection.addEventListener("click", () => {
            if (degreeIcon.textContent === "°C") {
              degreeIcon.textContent = "°F";
              temperatureDegree.textContent = Math.round(farenheitFormula);
            } else {
              degreeIcon.textContent = "°C";
              temperatureDegree.textContent = Math.round(temp);
            }
          });
        });
    });
  } else {
    h1.textContent = "Please enable geolocation.";
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // adding input with city searching
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      city = document.querySelector("input").value;
      const apiCities = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=9f4f41bc3e58defc7ee39e089710e216`;
      input.value = "";
      fetch(apiCities)
        .then((responce) => {
          return responce.json();
        })
        .then((data) => {
          console.log(data);

          long = data[0].lon.toFixed(5);
          lat = data[0].lat.toFixed(5);
          console.log(long);
          console.log(lat);

          //-   new city weather   ------------------------------------------
          const apiLocal1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9f4f41bc3e58defc7ee39e089710e216&units=metric`;

          fetch(apiLocal1)
            .then((responce) => {
              return responce.json();
            })
            .then((data) => {
              console.log(data);
              const temp = data.main.temp;
              const tempDescription = data.weather[0].description;
              const iconId = data.weather[0].icon;
              const timezone = data.name;

              //set DOM elements from the API
              temperatureDescription.textContent =
                capitalizeFirstLetter(tempDescription);
              locationTimezone.textContent = timezone;
              temperatureDegree.textContent = Math.round(temp);
              iconDisplay.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
            });

          //----------------
        });
    }
  });
});
