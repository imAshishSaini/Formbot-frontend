import React from 'react';
import styles from './HomePage.module.css'
import botLogo from '../assets/logo.png'
import homeContainer from '../assets/homeContainer.png'
import homeBottom from '../assets/homeBottom.png'
import homeDeco from '../assets/homeDeco.png'
import homeDeco1 from '../assets/homeDeco1.png'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <header className={styles.header}>
                <div className={styles.logo}>
                    <img src={botLogo} alt="FormBot Logo" className={styles.logoImage} />
                    FormBot
                    </div>
                <nav className={styles.nav}>
                    <button className={styles.navButton} onClick={() => navigate('/login-register')}>Sign In</button>
                    <button className={`${styles.navButton} ${styles.primaryButton}`} onClick={() => navigate('/login-register')}>Create a FormBot</button>
                </nav>
            </header>
            <img src={homeDeco} alt="" className={styles.homeDeco}/>
            <img src={homeDeco1} alt="" className={styles.homeDeco1} />
            <img src={homeContainer} />
            <img src={homeBottom} />
        </div>
    );
}

export default HomePage;
