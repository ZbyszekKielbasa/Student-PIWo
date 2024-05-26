import React, {useEffect} from 'react';
import "../App.css";
import { useState } from "react";
import ListHotel from "../components/ListHotel";
import {NavLink, useNavigate} from "react-router-dom";
import { login, loginWithEmailPassword, registerWithEmailPassword, useUser, logout } from "../data/userSerive";
import { readData, createData } from "../data/dataService";
import { useOutletContext } from "react-router-dom";
import TopBar from '../components/TopBar';

import Modal from '../components/Modal';

import logo from "../Assets/logo.svg";

const Przegladanie = () => {
    const navigate = useNavigate();

    const [hotels, setHotels] = useOutletContext();
    const [newHotel, setNewHotel] = useState({ name: '', hotel: '', text: '', rating: '', price: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const user = useUser();

    const toggleModal = () => setShowModal(!showModal);

    useEffect(()=>{

        readData().then(docs => setHotels(docs))

    }, [user]);

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

    const addNewHotel = async (event) => {
        event.preventDefault();
        const newHotelToAdd = {
            ...newHotel,
            id: hotels.length // simplistic approach to generate unique ID
        };
        try {
            await createData(newHotelToAdd); // Adding to Firestore
            setHotels(prevHotels => [...prevHotels, newHotelToAdd]); // Updating local state
            setNewHotel({ name: '', hotel: '', text: '', rating: '', price: '' }); // Reset form fields
        } catch (error) {
            console.error("Error adding hotel:", error);
            alert("Failed to add hotel: " + error.message);
        }
    };

    const hotelList = filteredHotels.map(hotel => <ListHotel key={hotel.id} hotel={hotel} />);

    return (
        <main>
            <TopBar />

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
                {user ?
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
                    :
                <div></div>}

                <section className="grid hotel-cards">

                    {hotelList}

                </section>
            </section>
        </main>
    );
};

export default Przegladanie;
