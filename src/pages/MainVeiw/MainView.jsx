import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Context } from 'App';
import CardList from 'components/CardList';
import styles from './MainView.module.scss';

const MainView = (props) => {
    const { search, setSearch, page, setPage, pageQty } = props;
    const { order, sort, setSort } = useContext(Context);
    const navigate = useNavigate();

    const options = [
        { value: '', label: 'Not sorted' },
        { value: 'title asc', label: 'Sort by title A-Z' },
        { value: 'title desc', label: 'Sort by title Z-A' },
        { value: 'price asc', label: 'Sort by price up' },
        { value: 'price desc', label: 'Sort by price down' },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <input
                    className={styles.panel__input}
                    type="text"
                    value={search}
                    placeholder='Search...'
                    onChange={(event) => setSearch(event.target.value)}
                />
                <button
                    className={styles.panel__btn}
                    onClick={() => navigate('/form')}
                >
                    Create
                </button>
            </div>
            <select
                className={styles.panel__select}
                value={sort}
                onChange={(event) => setSort(event.target.value)}
            >
                {
                    options.map(option => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))
                }
            </select>
            <CardList />
            <div className={styles.pageNum}>
                <button
                    className={styles.pageNum__btn}
                    disabled={page === 1}
                    onClick={() => setPage(prev => prev - 1)}
                >
                    &lt;
                </button>
                {page}
                <button
                    className={styles.pageNum__btn}
                    disabled={page >= pageQty}
                    onClick={() => setPage(prev => prev + 1)}
                >
                    &gt;
                </button>
            </div>
            <div
                className={styles.cart}
                onClick={() => navigate('/cart')}
            >
                <img src="assets/cart.svg" alt="cart-icon" />
                {
                    order.length ? <span className={styles.cart__quantity}>{order.length}</span> : null
                }
            </div>
        </div>
    );
};

MainView.propTypes = {
    search: PropTypes.string,
    setSearch: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    pageQty: PropTypes.number.isRequired
}

MainView.defaultProps = {
    search: ''
}

export default MainView;