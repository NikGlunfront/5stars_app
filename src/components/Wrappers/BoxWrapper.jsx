import React from 'react';
import { NavLink } from 'react-router-dom';

const BoxWrapper = ({
    children,
    linkPath = null,
    className = null
}) => {
    return (
        linkPath !== null
            ?
            <NavLink className={'s5-box-wrapper ' + (className ? className : '')} to={linkPath}>
                {children}
            </NavLink>
            :
            <div className={'s5-box-wrapper ' + (className ? className : '')}>
                {children}
            </div>
        
    );
};

export default BoxWrapper;