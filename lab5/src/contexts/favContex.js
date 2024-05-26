import { createContext, useState } from 'react';

const FavContext = createContext();

export const FavProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Function to add a hotel to the favorites
    const addFavorite = (hotel) => {
        setFavorites(prevFavorites => [...prevFavorites, hotel]);
    };

    // Function to remove a hotel from the favorites
    const removeFavorite = (hotelId) => {
        setFavorites(prevFavorites => prevFavorites.filter(hotel => hotel.id !== hotelId));
    };

    return (
        <FavContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavContext.Provider>
    );
};

export default FavContext;
