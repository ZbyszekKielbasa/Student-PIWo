import React, { useContext, useState, useEffect } from "react";
import heart1 from "../Assets/heart1.png";
import heart2 from "../Assets/heart2.png"; // Ensure you have this asset
import arrow from "../Assets/Arrow.svg";
import { NavLink } from 'react-router-dom';
import FavContext from '../contexts/favContex'; // Import your FavContext

const ListHotel = ({ hotel }) => {
    const { favorites, addFavorite, removeFavorite } = useContext(FavContext);
    const [isFavorite, setIsFavorite] = useState(false);
    const [heartIcon, setHeartIcon] = useState(heart1);

    console.log(favorites);
    // Check if the hotel is already in favorites on component mount and updates
    useEffect(() => {
        const found = favorites.some(fav => fav.id === hotel.id);
        setIsFavorite(found);
        setHeartIcon(found ? heart2 : heart1);
    }, [favorites, hotel.id]);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(hotel.id);
        } else {
            addFavorite(hotel);
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <article className="hotel-card">
            <div className="card-image">
                <p className="chip">{hotel.name}</p>
                <button className="button-heart" onClick={toggleFavorite}>
                    <img src={heartIcon} alt="Favorite"/>
                </button>
            </div>
            <p className="text-middle">{hotel.hotel}</p>
            <p className="text-small">{hotel.text}</p>
            <div className="hotel-card-footer">
                <p className="text-middle">{hotel.rating}</p>
                <p className="text-middle">{hotel.price}</p>
            </div>
            <NavLink to="/detail" state={{ hotel }} className="button primary">View offer <img src={arrow} alt="View offer"/></NavLink>
        </article>
    );
};

export default ListHotel;
