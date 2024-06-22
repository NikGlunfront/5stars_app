import React from 'react';

const BoxWrapper = ({
    children,
    className = null
}) => {
    return (
        <div className={'s5-box-wrapper ' + (className ? className : '')}>
            {children}
        </div>
    );
};

export default BoxWrapper;