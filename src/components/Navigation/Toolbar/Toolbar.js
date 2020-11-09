import React from 'react';
import styles from './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <DrawerToggle click={props.toggleClick}/>
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DeskTopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;