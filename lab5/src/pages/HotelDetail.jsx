import React, {useRef, useState} from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '../components/Modal';

import logo from "../Assets/logo.svg";
import pencil from "../Assets/pencil.svg"
import trash from "../Assets/trash.svg"
import arrow from "../Assets/Arrow.svg"
import {updateData} from "../data/dataService";
import  {createMessage} from "../data/messageService";
import {auth} from "../data/init";
import TopBar from "../components/TopBar";

const HotelDetail = () => {
    const location = useLocation();
    const [hotel, setHotel] = useState(location.state?.hotel);
    const [showEditModal, setShowEditModal] = useState(false);

    const emailMessageRef = useRef('');
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');

    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHotel(prev => ({ ...prev, [name]: value }));
    };

    const handleEmailClick = () => {
        setShowEmailModal(true);
    };

    const saveChanges = async () => {
        try {
            const updateResult = await updateData(hotel.id, {
                name: hotel.name,
                hotel: hotel.hotel,
                rating: hotel.rating,
                price: hotel.price,
                text: hotel.text
            });

            if (updateResult && updateResult.success) {
                setShowEditModal(false);
                alert('Hotel updated successfully!');
            } else {
                alert('Failed to update hotel: ' + updateResult.message);
            }
        } catch (error) {
            console.error("Error updating hotel:", error);
            alert('Failed to update hotel: ' + error.message);
        }
    };

    const handleSendEmail = async () => {
        try {
            const messageContent = emailMessageRef.current.value; // Getting the current value from the textarea
            if (messageContent.trim() === '') {
                alert('Please enter a message before sending.');
                return;
            }

            // Assuming hotel.userId is the recipient's user ID
            await createMessage({
                recipientId: hotel.userId, // This needs to be defined properly, make sure `hotel.userId` exists
                text: messageContent,
                senderId: auth.currentUser.uid // This should be handled inside createMessage normally
            });

            alert('Email sent successfully!');
            setShowEmailModal(false);
            emailMessageRef.current.value = ''; // Reset the textarea after sending the email
        } catch (error) {
            console.error('Failed to send email:', error);
            alert('Failed to send email: ' + error.message);
        }
    };

    const isOwner = userId && hotel.userId === userId;

    return (
        <main>
            <TopBar />

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
                        {isOwner && (
                            <>
                                <button className="button primary" onClick={handleEdit}>Edit<img src={pencil} /></button>
                                <button className="button primary">Remove<img src={trash} /></button>
                            </>
                        )}
                        <button className="button primary" onClick={handleEmailClick}>E-mail<img src={arrow}/></button>
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

            {showEmailModal &&
                <Modal show={showEmailModal} onClose={() => { setShowEmailModal(false); emailMessageRef.current = ''; }}>
                    <form onSubmit={(e) => { e.preventDefault(); handleSendEmail(); }}>
            <textarea
                ref={emailMessageRef}
                defaultValue={emailMessageRef.current}
                placeholder="Write your message here..."
                style={{ width: '100%', minHeight: '200px' }}
            />
                        <button type="submit">Send Email</button>
                    </form>
                </Modal>}

        </main>
    );
}

export default HotelDetail;
