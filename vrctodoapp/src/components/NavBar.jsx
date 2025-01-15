import React from "react";
import '../App.css';
import logo from '../assets/img/vrcafe_logo.webp';

const NavBar = () => {
    return (
        <div>
            <div className="navBarBackgroundTop"></div>
            <a href="https://www.vrcafehaarlem.nl/">
                <img src={logo} alt="VR Cafe Logo" className="logo" />
            </a>
            <div className="navBarBackgroundBottom"></div>
        </div>
    );
};

export default NavBar;
