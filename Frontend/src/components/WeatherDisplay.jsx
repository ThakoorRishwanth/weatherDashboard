import React from 'react';
import '../App.css';

const WeatherDisplay = ({ data, addFavorite, isAddingFavorite, city, favoriteAdded, alreadyAdded }) => {
    if (!data || data.length === 0) {
        return <p className="text-center mt-10">No data available. Please search for a city to view the weather.</p>;
    }

    const getWeatherIcon = (description) => {
        switch (description) {
            case 'clear sky':
                return '☀️';
            case 'few clouds':
                return '🌤️';
            case 'scattered clouds':
                return '☁️';
            case 'broken clouds':
                return '🌥️';
            case 'shower rain':
                return '🌧️';
            case 'rain':
                return '🌦️';
            case 'thunderstorm':
                return '⛈️';
            case 'snow':
                return '❄️';
            case 'mist':
                return '🌫️';
            default:
                return '☁️';
        }
    };

    const getNextFiveDays = () => {
        const today = new Date();
        return Array.from({ length: 5 }, (_, i) => {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);
            return nextDay.toISOString().split('T')[0];
        });
    };

    const dates = getNextFiveDays();

    return (
        <div className="weather-container">
            <div className="weather-info">
                {data[0].temp}° - {data[0].description}
            </div>
            <div className="weather-description">
                {getWeatherIcon(data[0].description)}
            </div>
            <h2>Next Five Days Report</h2>  {/* Display the next five days report */}
            <div className="forecast-grid">
                {data.slice(0, 5).map((forecast, index) => (
                    <div key={index} className="forecast-card">
                        <h2>{dates[index]}</h2>  {/* Use calculated date */}
                        <img src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`} alt="weather icon" />
                        <p>{forecast.temp}° - {forecast.description}</p>
                        <p>{forecast.humidity}% Humidity</p>
                        <p>{forecast.windSpeed} km/h Wind</p>
                    </div>
                ))}
            </div>
            <div className="add-favorite-container">
                <button 
                    onClick={addFavorite} 
                    className={`add-favorite-button-bottom ${isAddingFavorite || favoriteAdded || alreadyAdded ? 'disabled' : ''}`}
                    disabled={isAddingFavorite || favoriteAdded || alreadyAdded}  // Disable button when loading, added, or already added
                >
                    {isAddingFavorite ? 'Loading...' : (favoriteAdded ? 'Added' : 'Add to Favorite')}
                </button>
            </div>
        </div>
    );
};

export default WeatherDisplay;
