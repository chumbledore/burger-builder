import React from 'react';
import styles from './SideDrawer.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
    let attachedStyles = [styles.SideDrawer, styles.Close];
    if (props.toggle) {
        attachedStyles = [styles.SideDrawer, styles.Open];
    }
    return (
        <Aux>
        <BackDrop show={props.toggle} click={props.toggleClick}/>
        <div className={attachedStyles.join(' ')}>
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    );
};

export default sideDrawer;