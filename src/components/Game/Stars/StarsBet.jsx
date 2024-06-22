import React from 'react';
import StarItem from './StarItem';

const betStars = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
]

const StarsBet = ({
    
}) => {
    return (
        <div className='stars-s5-game__bet'>
            {betStars.map(star => (
                <StarItem
                    starId={star.id}
                    key={star.id}
                />
            ))}
        </div>
    );
};

export default StarsBet;