import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '../components/Modal';

import logo from "../Assets/logo.svg";
import pencil from "../Assets/pencil.svg"
import trash from "../Assets/trash.svg"
import {updateData} from "../data/dataService";

const HotelDetail = () => {
    const location = useLocation();
    const [hotel, setHotel] = useState(location.state?.hotel);
    const [showEditModal, setShowEditModal] = useState(false);

    console.log(hotel.id);
    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHotel(prev => ({ ...prev, [name]: value }));
    };

    const saveChanges = async () => {
        try {
            await updateData(hotel.id, {
                name: hotel.name,
                hotel: hotel.hotel,
                rating: hotel.rating,
                price: hotel.price,
                text: hotel.text
            });
            setShowEditModal(false);
            alert('Hotel updated successfully!');
        } catch (error) {
            console.error("Error updating hotel:", error);
            alert('Failed to update hotel: ' + error.message);
        }
    };

    return (
        <main>
            <nav className="fixed-navigation">
                <img className="logo" src={logo}/>
                <ul className="nav-links">
                    <li><a className="nav-link" href="#">Home</a></li>
                    <li><a className="nav-link" href="#browse">Browse</a></li>
                    <li><a className="nav-link" href="#rent">Rent with us</a></li>
                    <li><a className="nav-link" href="#">Sign up</a></li>
                    <button className="button primary">Log in</button>
                </ul>
                <button className="button primary hidden">Menu</button>
            </nav>
            <section id="hero" className="grid hero-section">
                <div className="gird-a">
                    <p className="title-large">{hotel.name}</p>
                </div>
                <div className="hero-image-container">
                </div>
                <article className="hero-details">
                    <div className="info">
                        <b>Location: </b> {hotel.hotel}<br/>
                        <b>Local category: </b> {hotel.rating}<br/>
                        <b>Price: </b> {hotel.price}/night<br/>
                        <b>Description: </b> <br/>
                    </div>
                    <p className="text-middle">
                        {hotel.text}<br/>
                    </p>
                    <div className="buttons">
                        <button className="button primary" id="editButton" onClick={handleEdit}>Edit<img src={pencil}/></button>
                        <button className="button primary">Remove<img src={trash}/></button>
                    </div>
                    <div className="hero-cards">
                        <div className="card-image">
                        </div>
                        <div className="card-image">
                        </div>
                    </div>
                </article>
            </section>
            {showEditModal &&
                <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
                    <form onSubmit={e => { e.preventDefault(); saveChanges(); }}>
                        <input type="text" name="name" value={hotel.name} onChange={handleInputChange} />
                        <input type="text" name="hotel" value={hotel.hotel} onChange={handleInputChange} />
                        <input type="text" name="rating" value={hotel.rating} onChange={handleInputChange} />
                        <input type="text" name="price" value={hotel.price} onChange={handleInputChange} />
                        <textarea name="text" value={hotel.text} onChange={handleInputChange} />
                        <button type="submit">Save Changes</button>
                    </form>
                </Modal>}

        </main>
    );
}

export default HotelDetail;
