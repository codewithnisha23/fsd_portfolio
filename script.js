async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
  
    if (!city) {
      document.getElementById("weatherResult").innerHTML = `
        <p style="color:red;">⚠ Please enter a city name.</p>
      `;
      return;
    }
  
    const apiKey = "cf0f9d55a3ae1fd9dd9c68a1259ef487"; // 🔑 Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    document.getElementById("weatherResult").innerHTML = "<p>Loading...</p>";
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
        document.getElementById("weatherResult").innerHTML = `
          <p><strong>${data.name}, ${data.sys.country}</strong></p>
          <img src="${iconUrl}" alt="Weather Icon" class="weather-icon">
          <p>🌡 Temp: ${data.main.temp}°C</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
          <p>🌥 Condition: ${data.weather[0].description}</p>
        `;
      } else {
        document.getElementById("weatherResult").innerHTML = `
          <p style="color:red;">❌ City not found.</p>
          <p>👉 Check spelling or try adding country code (e.g., "Delhi, IN").</p>
        `;
      }
    } catch (error) {
      document.getElementById("weatherResult").innerHTML = `
        <p style="color:red;">⚠ Unable to fetch weather data.</p>
        <p>Please check your internet connection or API key.</p>
      `;
    }
  }
  
  