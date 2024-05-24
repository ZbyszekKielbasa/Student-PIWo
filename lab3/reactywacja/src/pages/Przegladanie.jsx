import React from 'react';
import "../App.css";
import { useState } from "react";
import ListHotel from "../components/ListHotel";

import { useOutletContext } from "react-router-dom";

import logo from "../Assets/logo.svg";

const Przegladanie = () => {
    const [hotels, setHotels] = useOutletContext();
    const [newHotel, setNewHotel] = useState({ name: '', hotel: '', text: '', rating: '', price: '' });
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewHotel(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredHotels = hotels.filter(hotel =>
        Object.values(hotel).some(value =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const addNewHotel = (event) => {
        event.preventDefault();
        const newHotelToAdd = {
            ...newHotel,
            id: Math.random() // simplistic approach to generate unique ID
        };
        setHotels(prevHotels => [...prevHotels, newHotelToAdd]);
        setNewHotel({ name: '', hotel: '', text: '', rating: '', price: '' }); // Reset the form
    };

    const hotelList = filteredHotels.map(hotel => <ListHotel key={hotel.id} hotel={hotel} />);

    return (
        <main>
            <nav className="fixed-navigation">
                <img className="logo" src={logo}/>
                <ul className="nav-links">
                    <li><a className="nav-link" href="#">Home</a></li>
                    <li><a className="nav-link" href="#browse">Find offers</a></li>
                    <li><a className="nav-link" href="#rent">Add new offers</a></li>
                    <li><a className="nav-link" href="#">My offers</a></li>
                    <li><a className="nav-link" href="#">Favorites</a></li>
                    <button className="button primary">Log out</button>
                </ul>
                <button className="button primary hidden">Menu</button>
            </nav>

            <section id="hero" className="grid hero-section">
                <article className="hero-detail">
                    <p className="title-large">Welcome, your tranquility oasis awaits</p>
                </article>
            </section>

            <section id="browse" className="browse-section">
                <p className="title-middle">Explore the hotels</p>
                <input
                    className="searchbar"
                    placeholder="Search by hotel name, place, description etc."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <form onSubmit={addNewHotel}>
                    <input type="text" name="name" placeholder="Name" value={newHotel.name}
                           onChange={handleInputChange} required/>
                    <input type="text" name="hotel" placeholder="Hotel" value={newHotel.hotel}
                           onChange={handleInputChange} required/>
                    <input type="text" name="text" placeholder="Description" value={newHotel.text}
                           onChange={handleInputChange} required/>
                    <input type="text" name="rating" placeholder="Rating" value={newHotel.rating}
                           onChange={handleInputChange} required/>
                    <input type="text" name="price" placeholder="Price" value={newHotel.price}
                           onChange={handleInputChange} required/>
                    <button type="submit" className="button primary">Add Hotel</button>
                </form>
                <section className="grid hotel-cards">

                    {hotelList}

                </section>
            </section>
        </main>
    );
};

export default Przegladanie;
