import React from 'react';
import styles from './Button.css';

const button = (props) => (
    <button
        onClick={props.click}
        className={[styles.Button, styles[props.btnType]].join(' ')}>{props.children}</button>
);


export default button;