import React from 'react';
import '../App.css';

const Favorites = ({ favorites, setFavorites, removeFavorite }) => {

    const handleRemove = (id) => {
        removeFavorite(id); // Call removeFavorite passed down from App.js
    };

    return (
        <div className='favorites p-8'>
            {favorites.length === 0 ? (
                <p className="text-white">No favorites added yet.</p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {favorites.map((favorite) => (
                        <div key={favorite.id} className='favorite-item bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg shadow-lg text-white transform transition duration-500 hover:scale-105 hover:shadow-2xl'>
                            <h3 className='text-xl font-bold mb-2'>{favorite.name}</h3>
                            <p className='text-4xl font-semibold mb-2'>{favorite.weatherData.temp}°C</p>
                            <p className='text-lg capitalize'>{favorite.weatherData.description}</p>
                            <button 
                                onClick={() => handleRemove(favorite.id)} 
                                className='sidebar-remove-button'
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
