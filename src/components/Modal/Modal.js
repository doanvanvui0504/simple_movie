import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';

function Modal({ children, id, active: activeProps }) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(activeProps);
    }, [activeProps]);

    return (
        <div id={id} className={`modal ${active ? 'active' : ''}`}>
            {children}
        </div>
    );
}

Modal.propTypes = {
    activeProps: PropTypes.bool,
    id: PropTypes.string,
};

export function ModalContent({ children, onClose = () => {} }) {
    const contentRef = useRef(null);

    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('active');
        if (onClose) onClose();
    };

    return (
        <div ref={contentRef} className="modal__content">
            {children}
            <div className="modal__content__close" onClick={closeModal}>
                <i className="bx bx-x"></i>
            </div>
        </div>
    );
}

ModalContent.propTypes = {
    onClose: PropTypes.func,
};

export default Modal;
