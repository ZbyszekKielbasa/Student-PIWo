import React from 'react';
import { useLocation } from 'react-router-dom';

import logo from "../Assets/logo.svg";
import pencil from "../Assets/pencil.svg"
import trash from "../Assets/trash.svg"

const HotelDetail = () => {
    const location = useLocation();
    const hotel = location.state?.hotel;

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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec leo ligula. Etiam fermentum est
                        in euismod egestas. Curabitur at condimentum ligula. Phasellus nunc velit, facilisis fermentum
                        congue ac, cursus at leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam
                        nec sapien vitae neque scelerisque tempus. Vestibulum hendrerit tellus ut pulvinar feugiat.
                        Nullam iaculis vitae justo sit amet tempus. Nam nunc nunc, porttitor sed turpis quis, feugiat
                        egestas leo. Phasellus consequat magna ante, ac aliquam felis convallis sit amet. Sed massa
                        lorem, iaculis ac vestibulum ac, tempus a tortor. Ut posuere ipsum nec condimentum vehicula.
                        Curabitur orci velit, aliquam vel arcu quis, semper congue ligula.
                    </p>
                    <div className="buttons">
                        <button className="button primary" id="editButton">Edit<img src={pencil}/></button>
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
        </main>
    );
}

export default HotelDetail;
