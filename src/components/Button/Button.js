import PropTypes from 'prop-types';

import './Button.scss';

function Button({ children, className = '', onClick = () => {} }) {
    return (
        <button className={`btn ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

export function OutlineButton({ children, className = '', onClick = () => {} }) {
    return (
        <Button className={`btn--outline ${className}`} onClick={onClick}>
            {children}
        </Button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
};

OutlineButton.propTypes = {
    onClick: PropTypes.func,
};

export default Button;
