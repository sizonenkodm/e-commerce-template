import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from 'App';
import CardItem from 'components/CardItem';
import styles from './CardList.module.scss';

const CardList = (props) => {
    const { cartVariant } = props;
    const { products, order } = useContext(Context);

    return (
        <div className={styles.container}>
            {
                cartVariant
                    ? order.map(el => <CardItem key={el.id} {...el} cartVariant={cartVariant} />)
                    : products.map(el => <CardItem key={el.id} {...el} />)
            }
        </div>
    );
};

CardList.propTypes = {
    cartVariant: PropTypes.bool
}

CardList.defaultProps = {
    cartVariant: false,
}

export default CardList;