import React from 'react'
import styles from './formNavBar.module.css'
import closeIcon from '../assets/closeIcon.png'

function formNavBar({ setActiveTab, activeTab, theme, setTheme }) {
    return (
        <div className={`${styles.navBar} ${styles[theme]}`}>
            <div className={styles.formName}>
                <input
                    type="text"
                    placeholder="Enter Form Name"
                    className={styles.formNameInput}
                />
            </div>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'flow' ? styles.activeTab : ''
                        }`}
                    onClick={() => setActiveTab('flow')}
                >
                    Flow
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'response' ? styles.activeTab : ''
                        }`}
                    onClick={() => setActiveTab('response')}
                >
                    Response
                </button>
            </div>
            <div className={styles.actionSection}>
                <div className={styles.themeToggle}>
                    <label>
                        Light
                        <input
                            type="checkbox"
                            checked={theme === 'dark'}
                            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        />
                        <span className={styles.toggleSwitch}></span>
                        Dark
                    </label>
                </div>
                <button className={styles.shareButton}>Share</button>
                <button className={styles.saveButton}>Save</button>
                <img src={closeIcon} alt="Close Icon" className={styles.closeIcon} />
            </div>
        </div>
    )
}

export default formNavBar