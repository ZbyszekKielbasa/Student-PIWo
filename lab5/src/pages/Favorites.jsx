import React, { useContext } from 'react';
import ListHotel from "../components/ListHotel";
import FavContext from '../contexts/favContex';
import TopBar from "../components/TopBar"; // Ensure this is correctly imported

const Favorites = () => {
    const { favorites } = useContext(FavContext);

    return (
        <main>
            <TopBar/>

            <section id="browse" className="browse-section">

                <section id="hero" className="grid hero-section">
                    <article className="hero-detail">
                        <p className="title-large">Favorites</p>
                    </article>
                </section>

                <section className="grid hotel-cards">
                    {favorites.length > 0 ? (
                        favorites.map(hotel => <ListHotel key={hotel.id} hotel={hotel}/>)
                    ) : (
                        <p>No favorite hotels added.</p>
                    )}
                </section>
            </section>
        </main>
);
};

export default Favorites;
