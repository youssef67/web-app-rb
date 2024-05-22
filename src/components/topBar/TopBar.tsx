import React from 'react';
import styles from './TopBar.module.css'
// import logo from '@assets/logo.svg';

const TopBar: React.FC = () => {
    return (
        <>
        <div className={styles.topbar}>
            <div className={styles.logo}>
                {/* <img src={logo} alt="logo" /> */}
            </div>
            <div className={styles.companyName}>
                RABBIT BUTCHER
            </div>
        </div>
        </>
    );
}



export default TopBar;
