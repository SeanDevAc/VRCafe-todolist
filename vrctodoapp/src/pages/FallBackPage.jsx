import React from "react";
import '../App.css';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

const FallBackPage = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/')
    }

    return (
        <div>
            <NavBar />
            <h1>Oeps... dat is de verkeerde pagina</h1>
            <button onClick={handleNavigate}>TERUG NAAR START</button>
        </div>
    );
};

export default FallBackPage;
