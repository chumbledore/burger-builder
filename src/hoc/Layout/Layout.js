import React, { Component } from 'react';
import styles from './Layout.css';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerToggle = () => {
        this.setState((prevState) => { 
            return { showSideDrawer: !prevState.showSideDrawer}
        } );
    }

    render () {
        return (
        <Aux>
            <Toolbar 
                toggleClick={this.sideDrawerToggle}/>
            <SideDrawer 
                toggleClick={this.sideDrawerToggle}
                toggle={this.state.showSideDrawer}/>
            <main className={styles.Content}>
                {this.props.children}
            </main>
         </Aux>
        )
    }
    
}

export default Layout;