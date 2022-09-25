import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRequest, updateRequest } from 'utils/axios_utils';
import { Context } from 'App';
import InputField from 'components/InputField';
import styles from './FormView.module.scss';

const FormView = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [titleDirty, setTitleDirty] = useState(false);
    const [descriptionDirty, setDescriptionDirty] = useState(false);
    const [priceDirty, setPriceDirty] = useState(false);

    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [priceError, setPriceError] = useState('');

    const [disabled, setDisabled] = useState(true);

    const {
        cardForUpdate,
        setCardForUpdate,
        setUpd
    } = useContext(Context);

    const notFormEl = useRef();
    const navigate = useNavigate();
    const updatingMode = Object.keys(cardForUpdate).length !== 0;

    const titleHandler = (event) => {
        setTitleDirty(true);
        const firstLetter = String(event.target.value)[0];
        if (firstLetter.toUpperCase() !== firstLetter) {
            setTitleError('Title must begin with a capital letter!');
        } else if (String(event.target.value).length < 3) {
            setTitleError('Title should be no less than 3 symbols!');
        } else {
            setTitleError('');
        }
    }

    const descriptionHandler = (event) => {
        setDescriptionDirty(true);
        if (String(event.target.value).length < 15) {
            setDescriptionError('Description should be no less than 15 symbols!');
        } else {
            setDescriptionError('');
        }
    }

    const priceHandler = (event) => {
        setPriceDirty(true);
        event.target.value = event.target.value.replace(/[^\d]/, '');
        if (+event.target.value === 0) {
            setPriceError('Price value can\`t be 0!');
        } else {
            setPriceError('');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newItem = {
            title,
            description,
            price: +price
        }

        if (updatingMode) {
            newItem.id = cardForUpdate.id;
            updateRequest('products', newItem);
            if (cardForUpdate.inCart) {
                updateRequest('cart', newItem);
            }
        } else {
            newItem.id = String(Date.now());
            newItem.inCurt = false;
            createRequest('products', newItem);
        }

        setUpd(true);
        setTimeout(() => {
            navigate('/');
            toDefaultValues();
        }, 500);
    }

    const toDefaultValues = () => {
        setTitle('');
        setDescription('');
        setPrice('');

        setTitleDirty(false);
        setDescriptionDirty(false);
        setPriceDirty(false);

        setTitleError('');
        setDescriptionError('');
        setPriceError('');

        setCardForUpdate({});
        setUpd(false);
    }

    const handleRedirect = (event) => {
        if (event.target === notFormEl.current) {
            toDefaultValues();
            navigate('/');
        }
    }

    useEffect(() => {
        if (updatingMode) {
            setTitle(cardForUpdate.title);
            setDescription(cardForUpdate.description);
            setPrice(cardForUpdate.price);
        }
    }, [cardForUpdate]);

    useEffect(() => {
        if (updatingMode) {
            if (!titleError && !descriptionError && !priceError) {
                setDisabled(false);
            }
        } else if (!titleError && !descriptionError && !priceError && (titleDirty && descriptionDirty && priceDirty)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }

    }, [titleError, descriptionError, priceError, titleDirty, descriptionDirty, priceDirty]);

    return (
        <div
            className={styles.container}
            ref={notFormEl}
            onClick={handleRedirect}
        >
            <form className={styles.form}>
                <h1>Create new card</h1>
                <InputField
                    type='text'
                    placeholder='Title'
                    error={titleError}
                    value={title}
                    setValue={setTitle}
                    inputHandler={titleHandler}
                    dirty={titleDirty}
                />
                <InputField
                    type='text'
                    placeholder='Description'
                    error={descriptionError}
                    value={description}
                    setValue={setDescription}
                    inputHandler={descriptionHandler}
                    dirty={descriptionDirty}
                />
                <InputField
                    type='text'
                    placeholder='Price'
                    error={priceError}
                    value={price}
                    setValue={setPrice}
                    inputHandler={priceHandler}
                    dirty={priceDirty}
                />
                <div className={styles.form__actions}>
                    <button
                        className={styles.form__btn}
                        onClick={handleSubmit}
                        disabled={disabled}
                    >
                        Save
                    </button>
                    <button
                        className={styles.form__btn}
                        onClick={() => {
                            toDefaultValues();
                            navigate('/');
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormView;