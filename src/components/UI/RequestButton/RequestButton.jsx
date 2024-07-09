import React from "react"

const RequestButton = ({
    children,
    className,
    isloading,
    disabled,
    onClick = () => {}
}) => {

    return (
        <button className={'request-btn ' + className + (isloading ? ' _load' : '') + (disabled ? " _disabled" : '')} onClick={onClick}>
            {children}
            {isloading &&
                <div className="loader"></div>
            }
        </button>
    )
};

export default RequestButton;
