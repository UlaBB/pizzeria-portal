import React from 'react';
import styles from '../Waiter/Waiter.module.scss';
import { Link } from 'react-router-dom';



const Ordering = () => (
    <div className={styles.component}>
        <h2> Ordering View</h2>
        <Link to={process.env.PUBLIC_URL + '/waiter/new'}>New Order</Link>
        <Link to={process.env.PUBLIC_URL + '/waiter/order/123abc'}>Orders</Link>
    </div>

);

export default Ordering;