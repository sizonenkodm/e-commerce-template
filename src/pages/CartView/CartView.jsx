import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from 'App';
import CardList from 'components/CardList';
import styles from './CartView.module.scss';

const CartView = () => {
    const { order } = useContext(Context);
    const notCartEl = useRef();

    const navigate = useNavigate();

    const totalPrice = order.reduce((sum, el) => {
        return sum + el.price * el.quantity;
    }, 0);

    const handleClick = (event) => {
        if (event.target === notCartEl.current) {
            navigate('/');
        }
    }

    return (
        <div
            className={styles.container}
            ref={notCartEl}
            onClick={handleClick}
        >
            <div className={styles.cart}>
                {
                    order.length
                        ? (
                            <>
                                <CardList cartVariant={true} />
                                <h2 className={styles.cart__cost}>Total cost: {totalPrice}</h2>
                            </>
                        )
                        : <h1>Cart is empty</h1>
                }
                <button
                    className={styles.cart__btn}
                    onClick={() => navigate('/')}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default CartView;