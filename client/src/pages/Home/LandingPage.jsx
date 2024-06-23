import React, { useState } from 'react';
import './LandingPage.css';
import LandingPageContent from '../../components/Content/LandingPageContent';
import { FooterWithLogo } from '../../layouts/Footer/FooterComponent';
import { StickyNavbar } from '../../layouts/Navbar/Home/NavbarSticky';

const LandingPage = () => {
    const [darkMode, setDarkMode] = useState(false);

    const backgroundStyle = {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        position: 'relative',
        zIndex: '0',
        backgroundColor: darkMode ? '#17202A' : '#FFFFFF',
    };

    // const fonts = {
    //     fontFamily: 'Le Havre, sans-serif',
    // };

    return (
        <div className="lp" style={backgroundStyle}>
            <StickyNavbar onToggleChange={setDarkMode} darkMode={darkMode} />
            <LandingPageContent darkMode={darkMode} />
            <FooterWithLogo darkMode={darkMode} />
        </div>
    );
}

export default LandingPage;
