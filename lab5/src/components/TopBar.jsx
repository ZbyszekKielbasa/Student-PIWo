import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { login, loginWithEmailPassword, logout, registerWithEmailPassword, useUser } from '../data/userSerive';
import logo from "../Assets/logo.svg";

const TopBar = () => {
    const navigate = useNavigate();
    const user = useUser();
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            setShowModal(false); // Close the modal when a user is logged in
        }
    }, [user]); // Dependency array includes user to react on changes

    const toggleModal = () => setShowModal(!showModal);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleMessageClick = () => {
        if (!user) {
            alert("Please log in to view messages.");
            setShowModal(true);  // Optionally open the login modal
        } else {
            navigate("/messages");  // Navigate to the messages page if logged in
        }
    };

    return (
        <nav className="fixed-navigation">
            <img className="logo" src={logo} alt="Logo"/>
            <ul className="nav-links">
                <li><NavLink to="/">Home</NavLink></li>
                <li><a className="nav-link" href="#browse">Find offers</a></li>
                <li><a className="nav-link" href="#rent">Add new offers</a></li>
                <li><a className="nav-link" onClick={handleMessageClick}>Messages</a></li>
                <li><NavLink to="/favorites">Favorites</NavLink></li>
                {!user ? (
                    <button className="button primary" onClick={toggleModal}>Login / Register</button>
                ) : (
                    <button className="App-mini-button" onClick={() => logout()}>
                        Logout {user?.displayName || "User"}
                    </button>
                )}

                {showModal && (
                    <Modal onClose={toggleModal}>
                        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} required/>
                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required/>
                        <button className="button primary"
                                onClick={() => registerWithEmailPassword(email, password, () => { toggleModal(); navigate('/'); })}>Register
                        </button>
                        <button className="button primary"
                                onClick={() => loginWithEmailPassword(email, password, () => { toggleModal(); navigate('/'); })}>Login with Email
                        </button>
                        <button className="button primary" onClick={() => login(() => { toggleModal(); navigate('/'); })}>Login with Google</button>
                    </Modal>
                )}
            </ul>
            <button className="button primary hidden">Menu</button>
        </nav>
    );
};

export default TopBar;
