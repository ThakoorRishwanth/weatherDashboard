// src/services/api.js
import axios from 'axios';

const API_KEY = '7db04a91d57d3403e3a20d38bcd1bd1b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const JSON_SERVER_URL = 'https://weatherdashboard-9wwg.onrender.com/favorite';

// Fetch weather data for a city
export const fetchWeatherData = async (cityName) => {
    const url = `${BASE_URL}forecast?q=${cityName}&appid=${API_KEY}&units=metric`;

    try {
        const response = await axios.get(url);
        const city = response.data.city.name;  // Get the city name from the API response
        const forecastData = response.data.list.map(item => ({
            temp: item.main.temp,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            date: item.dt_txt,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed
        }));
        return { city, forecastData };  // Return the city name and the forecast data
    } catch (error) {
        console.error('Error fetching the weather data:', error);
        throw error;
    }
};

// Add a city to favorites
export const addFavorite = async (city) => {
    try {
        const response = await axios.post(JSON_SERVER_URL, city);
        return response.data;
    } catch (error) {
        console.error('Error adding favorite:', error);
        throw error;
    }
};

// Get all favorite cities
export const getFavorites = async () => {
    try {
        const response = await axios.get(JSON_SERVER_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching favorites:', error);
        throw error;
    }
};

// Remove a city from favorites
export const removeFavorite = async (id) => {
    try {
        await axios.delete(`${JSON_SERVER_URL}/${id}`);
    } catch (error) {
        console.error('Error removing favorite:', error);
        throw error;
    }
};
