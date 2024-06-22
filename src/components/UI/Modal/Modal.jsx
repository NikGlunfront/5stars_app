import React from 'react';

const Modal = ({
    isActive= false,
    setActive,
    className,
    children,
    modalRef,
    topGap = 0
}) => {

    return (
        <div ref={modalRef} className={'modal-window' + (isActive ? ' _visible' : '')} onClick={() => setActive(false)} style={{top: topGap}}>
            <div className={"modal-window__content " + className} onClick={(e) => e.stopPropagation()}>
            <div className="modal-window__close" onClick={() => setActive(false)}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 1.00011L1 10M10 9.99989L1 1" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;