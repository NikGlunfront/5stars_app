import React from 'react';
import StarItemResult from './StarItemResult';

const betStars = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
]

const StarsResult = ({

}) => {
    return (
        <div className='stars-s5-game__bet _result'>
            {betStars.map(star => (
                <StarItemResult
                    starId={star.id}
                    key={star.id}
                />
            ))}
        </div>
    );
};

export default StarsResult;