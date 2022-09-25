import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './InputField.module.scss';

const InputField = (props) => {
    const {
        type,
        placeholder,
        error,
        value,
        setValue,
        inputHandler,
        dirty,
    } = props;

    const inputClass = cn({
        [styles.input]: true,
        [styles.error__input]: error
    });

    return (
        <>
            <input
                className={inputClass}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onInput={inputHandler}
            />
            {(dirty && error) && <small className={styles.error__message}>{error}</small>}
        </>
    );
};

InputField.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    error: PropTypes.string,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    inputHandler: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired,
}

InputField.defaultProps = {
    error: ''
}

export default InputField;