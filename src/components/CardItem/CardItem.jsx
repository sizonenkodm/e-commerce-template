import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Context } from 'App';
import { createRequest, updateRequest, deleteRequest } from 'utils/axios_utils';
import styles from './CardItem.module.scss';

const CardItem = (props) => {
    const {
        id,
        title,
        description,
        price,
        inCart,
        quantity,
        cartVariant
    } = props;

    const {
        setProducts,
        setOrder,
        setCardForUpdate,
        setUpd
    } = useContext(Context);

    const navigate = useNavigate();

    const addToCart = () => {
        const newItemInCart = {
            id,
            title,
            description,
            price,
            quantity: 1
        }

        createRequest('cart', newItemInCart);
        updateRequest('products', { id, inCart: true });

        setUpd(true);
        setTimeout(() => {
            setUpd(false)
        }, 300);
    }

    const handleDelete = () => {
        if (cartVariant) {
            deleteRequest('cart', id)
                .then(() => setOrder(prevState => prevState.filter(el => el.id !== id)));
            updateRequest('products', { id, inCart: false });
        } else if (inCart) {
            deleteRequest('products', id)
                .then(() => setProducts(prevState => prevState.filter(el => el.id !== id)));
            deleteRequest('cart', id)
                .then(() => setOrder(prevState => prevState.filter(el => el.id !== id)));
        } else {
            deleteRequest('products', id)
                .then(() => setProducts(prevState => prevState.filter(el => el.id !== id)));
        }

        setUpd(true);
        setTimeout(() => {
            setUpd(false)
        }, 300);
    }

    const changeQuantity = (step) => {
        updateRequest('cart', { id, quantity: quantity + step });

        setUpd(true);
        setTimeout(() => {
            setUpd(false)
        }, 300);
    }

    return (
        <div className={styles.card}>
            <h2 className={styles.card__title}>{title}</h2>
            <div className={styles.card__description}>{description}</div>
            <div className={styles.card__price}>Price: {price}</div>
            {
                cartVariant &&
                <div className={styles.card__quantity}>
                    Quantity:
                    <button
                        disabled={quantity === 1}
                        onClick={() => changeQuantity(-1)}
                    >
                        -
                    </button>
                    {quantity}
                    <button
                        onClick={() => changeQuantity(1)}
                    >
                        +
                    </button>
                </div>
            }
            <div className={styles.card__actions}>
                {
                    !cartVariant && <button
                        className={styles.card__btn}
                        onClick={() => {
                            setCardForUpdate({
                                id,
                                title,
                                description,
                                price,
                                inCart
                            });
                            navigate('/form');
                        }}
                    >
                        Edit
                    </button>
                }
                <button
                    className={styles.card__btn}
                    onClick={handleDelete}
                >
                    Delete
                </button>
                {
                    !cartVariant && <button
                        className={styles.card__btn}
                        disabled={inCart}
                        onClick={addToCart}
                    >
                        Add to cart
                    </button>
                }
            </div>
        </div>
    );
};

CardItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inCart: PropTypes.bool,
    quantity: PropTypes.number,
    cartVariant: PropTypes.bool
}

CardItem.defaultProps = {
    quantity: 1,
    cartVariant: false,
}

export default CardItem;