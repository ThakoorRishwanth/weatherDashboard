import React, { useState } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';
import Favorites from './components/Favorites';
import './App.css';
import { fetchWeatherData, addFavorite as addFavoriteToAPI } from './services/api';

function App() {
    const [data, setData] = useState([]);
    const [city, setCity] = useState("");  // State to store the city name
    const [favorites, setFavorites] = useState([]);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const handleSearch = async (cityName) => {
        try {
            const { city, forecastData } = await fetchWeatherData(cityName);  // Destructure the response
            setCity(city);  // Store the city name
            setData(forecastData);  // Store the forecast data
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const addFavorite = async () => {
        if (data.length > 0) {
            const favoriteCity = {
                name: city,  // Use the stored city name
                weatherData: data[0],  // Store the current weather data
            };

            try {
                // Add to the JSON server
                const response = await addFavoriteToAPI(favoriteCity);

                // After a successful POST, update the local state
                if (response) {
                    setFavorites([...favorites, response]);
                    console.log('Added to favorites:', response);
                }
            } catch (error) {
                console.error('Error adding favorite:', error);
            }
        }
    };

    return (
        <div className="app-container">
            <h1>Weather Companion</h1>
            <SearchBar onSearch={handleSearch} />
            <WeatherDisplay data={data} addFavorite={addFavorite} />
            <button 
                onClick={toggleSidebar} 
                className='favorite-section-button'
            >
                Favorite Section
            </button>
            <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
                <span className="close-btn" onClick={toggleSidebar}>&times;</span>
                <h2>Your Favorite Cities</h2>
                <Favorites favorites={favorites} setFavorites={setFavorites} />
            </div>
        </div>
    );
}

export default App;
