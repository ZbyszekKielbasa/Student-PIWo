import "./App.css";
import data from "./data/data.js";
import {useEffect, useState} from "react";
import { RouterProvider,  Outlet,  Route, createBrowserRouter, createRoutesFromElements, NavLink } from 'react-router-dom';
import Przegladanie from "./pages/Przegladanie";
import HotelDetail from "./pages/HotelDetail";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route path="" element={<Przegladanie />} />
            <Route path="detail" element={<HotelDetail />} />
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

const App = () => <RouterProvider router={router} />

export default App;
