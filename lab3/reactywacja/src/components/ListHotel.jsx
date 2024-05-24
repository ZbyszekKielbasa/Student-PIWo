import React, { useState } from "react";
import heart1 from "../Assets/heart1.png";
import arrow from "../Assets/Arrow.svg";
import { NavLink } from 'react-router-dom';

const ListHotel = ({ hotel }) => {
    return (
        <article className="hotel-card">
            <div className="card-image">
                <p className="chip">{hotel.name}</p>
                <button className="button-heart"><img src={heart1} alt="Favorite"/></button>
            </div>
            <p className="text-middle">{hotel.hotel}</p>
            <p className="text-small">{hotel.text}</p>
            <div className="hotel-card-footer">
                <p className="text-middle">{hotel.rating}</p>
                <p className="text-middle">{hotel.price}</p>
            </div>
            {/*<button className="button primary">View offer <img src={arrow} alt="View offer"/></button>*/}
            <NavLink to="/detail" state={{ hotel }} className="button primary">View offer <img src={arrow} alt="View offer"/></NavLink>
        </article>
    );
};

export default ListHotel;
