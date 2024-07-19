import React, { useState } from 'react';
import { useStarGame } from '../../../hooks/useStarGame';

const StarItem = ({
    starId
}) => {
    const {
        pickedStars,
        betAmount,
        handleStarClick
    } = useStarGame()

    const handleBet = () => {
        if (betAmount > 0) {
            handleStarClick(starId)
        }
    }

    return (
        <div className={'stars-s5-game__star' + (pickedStars.includes(starId) ? ' _active' : '') + (betAmount > 99 ? ' _long' : '')} onClick={handleBet}>
            <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.561 2.75001C26.7241 0.273432 30.2338 0.273436 31.3969 2.75001L37.494 15.7319C37.9629 16.7303 38.9061 17.4202 39.9966 17.5623L54.1435 19.4061C56.8373 19.7572 57.9193 23.0891 55.9491 24.9665L45.5557 34.8708C44.7622 35.6269 44.4046 36.7351 44.6056 37.8146L47.242 51.9749C47.7423 54.6622 44.9054 56.7244 42.5183 55.4087L30.0315 48.5267C29.0645 47.9937 27.8934 47.9937 26.9264 48.5267L14.4396 55.4087C12.0525 56.7244 9.21563 54.6622 9.71595 51.9749C10.5129 47.633 11.1119 43.8928 12.1872 41.374C15.234 36.876 31.5434 30.9388 30.809 30.0016C31.0057 29.1396 11.8288 33.4576 8.60273 31.6584L6.8105 30.5789L1.00876 24.9665C-0.961363 23.0891 0.12063 19.7572 2.81444 19.4061L16.9613 17.5623C18.0518 17.4202 18.995 16.7303 19.4639 15.7319L25.561 2.75001Z" fill="#dddbe7"/>
            </svg>
            <span>{betAmount}</span>
        </div>
    );
};

export default StarItem;