// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Cristóbal Gallardo & Vicente Santos - Todos los derechos reservados.</p>
        </footer>
    );
}

export default Footer;
