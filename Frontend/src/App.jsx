import React, { useState } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';
import Favorites from './components/Favorites';
import './App.css';
import { fetchWeatherData, addFavorite as addFavoriteToAPI, removeFavorite as removeFavoriteFromAPI } from './services/api';

function App() {
    const [data, setData] = useState([]);
    const [city, setCity] = useState("");  // State to store the city name
    const [favorites, setFavorites] = useState([]);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isAddingFavorite, setIsAddingFavorite] = useState(false); // State for loading indicator
    const [showAlert, setShowAlert] = useState(false); // State for alert visibility
    const [alreadyAdded, setAlreadyAdded] = useState(false); // State to check if already added
    const [favoriteAdded, setFavoriteAdded] = useState(false); // State to disable the button if added

    const handleSearch = async (cityName) => {
        setAlreadyAdded(false); // Reset already added state
        setShowAlert(false); // Reset the alert visibility
        setFavoriteAdded(false); // Reset the favorite added state
        try {
            const { city, forecastData } = await fetchWeatherData(cityName);  // Destructure the response
            setCity(city);  // Store the city name
            setData(forecastData);  // Store the forecast data
            
            // Check if the city is already in favorites
            if (favorites.some(fav => fav.name.toLowerCase() === city.toLowerCase())) {
                setFavoriteAdded(true); // Disable button if already added
            } else {
                setFavoriteAdded(false); // Enable button if not added
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const addFavorite = async () => {
        if (data.length > 0) {
            // Check if city is already in favorites
            if (favorites.some(fav => fav.name.toLowerCase() === city.toLowerCase())) {
                setAlreadyAdded(true);
                return;
            }

            const favoriteCity = {
                name: city,  // Use the stored city name
                weatherData: data[0],  // Store the current weather data
            };

            try {
                setIsAddingFavorite(true); // Start loading
                setShowAlert(false); // Reset alert visibility
                setAlreadyAdded(false); // Reset already added state
                // Add to the JSON server
                const response = await addFavoriteToAPI(favoriteCity);

                // After a successful POST, update the local state
                if (response) {
                    setFavorites([...favorites, response]);
                    setFavoriteAdded(true); // Disable button after adding
                    setShowAlert(true); // Show success alert
                    setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
                }
            } catch (error) {
                console.error('Error adding favorite:', error);
            } finally {
                setIsAddingFavorite(false); // Stop loading
            }
        }
    };

    const removeFavorite = async (id) => {
        try {
            await removeFavoriteFromAPI(id);

            // Update the local favorites state after removal
            const updatedFavorites = favorites.filter(favorite => favorite.id !== id);
            setFavorites(updatedFavorites);

            // Re-enable the "Add to Favorite" button if the removed city is the current one
            if (updatedFavorites.every(fav => fav.name.toLowerCase() !== city.toLowerCase())) {
                setFavoriteAdded(false); // Enable the button
                setAlreadyAdded(false);
            }

        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <div className="app-container">
            <h1>Weather Companion</h1>
            <SearchBar onSearch={handleSearch} setCity={setCity} />
            {city && <h2>{city}</h2>}  {/* Display the city name */}
            <WeatherDisplay 
                data={data} 
                addFavorite={addFavorite} 
                isAddingFavorite={isAddingFavorite} 
                city={city}
                favoriteAdded={favoriteAdded}
                alreadyAdded={alreadyAdded}
            />
            {showAlert && !alreadyAdded && <div className="alert show">Added to favorites!</div>}
            {alreadyAdded && <div className="alert show">City is already in favorites!</div>}
            <button 
                onClick={toggleSidebar} 
                className='favorite-section-button'
            >
                Favorite Section
            </button>
            <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
                <span className="close-btn" onClick={toggleSidebar}>&times;</span>
                <h2>Your Favorite Cities</h2>
                <Favorites favorites={favorites} setFavorites={setFavorites} removeFavorite={removeFavorite} />
            </div>
        </div>
    );
}

export default App;
