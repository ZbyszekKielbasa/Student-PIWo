import "./App.css";
import data from "./data/data.js";
import React, {useEffect, useState} from "react";
import { RouterProvider,  Outlet,  Route, createBrowserRouter, createRoutesFromElements, NavLink } from 'react-router-dom';
import Przegladanie from "./pages/Przegladanie";
import HotelDetail from "./pages/HotelDetail";
import {FavProvider} from "./contexts/favContex";
import Favorites from "./pages/Favorites";
import Messages from "./pages/Messages";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route path="" element={<Przegladanie />} />
            <Route path="detail" element={<HotelDetail />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="messages" element={<Messages />} />
        </Route>
    )
);

function AppLayout() {
    const [hotels, setHotels] = useState(data);

    return (
        <div>
            {/*<NavLink to="/" className="App-mini-button">Przegladanie</NavLink>*/}
            {/*<Przegladanie hotels={hotels} setHotels={setHotels} />*/}

            <Outlet context={[hotels, setHotels]}/>
        </div>
    );
}

const App = () => (
    <FavProvider>
        <RouterProvider router={router} />
    </FavProvider>
)

export default App;
