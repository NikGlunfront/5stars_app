import React, { useEffect, useState } from 'react';
import BoxWrapper from '../Wrappers/BoxWrapper';
import StarsBet from './Stars/StarsBet';
import { useStarGame } from '../../hooks/useStarGame';
import StarsResult from './Stars/StarsResult';

const bets = [
    {id: 1, val: 10},
    {id: 2, val: 50},
    {id: 3, val: 100},
]

const Game = ({

}) => {
    const {
        changeBet,
        betAmount,
        pickedStars,
        isGameFinished,
        resultNumber,
        initWinNum,
        betMultiply,
        calculateGame,
        gameResult,
        createNewGame
    } = useStarGame()

    useEffect(() => {
        if (!resultNumber) {
            initWinNum()
        }
    }, [])

    const playButtonHandler = () => {
        if (isGameFinished) {
            createNewGame()
        } else {
            calculateGame()
        }
    }

    const handleBetChange = (bet) => {
        changeBet(bet)
    }


    return (
        <BoxWrapper className={'s5-game'}>
            <div className={"s5-game__bets" + (isGameFinished ? ' _locked' : '')}>
                {bets.map(bet => (
                    <div 
                        className={"s5-game__bet" + (betAmount === bet.val ? ' _active' : '')} 
                        onClick={() => handleBetChange(bet.val)}
                        key={bet.id}
                    >
                        {bet.val}
                    </div>
                ))}
            </div>
            <div className="stars-s5-game">
                {isGameFinished
                    ?
                    <StarsResult />
                    :
                    <StarsBet />
                }
            </div>
            <div className="s5-game__text">
                {!isGameFinished 
                    ?
                    <p>Find the Lucky Star</p>
                    :
                    <p>You won <span className={gameResult > 0 ? '_win' : ''}>{gameResult}</span></p>
                }
            </div>
            <div className={"s5-game__btn" + (pickedStars.length ? ' _active' : '')} onClick={playButtonHandler}>
                <div>{isGameFinished ? 'PLAY AGAIN' : 'PLAY & WIN'}</div>
                <span className={!betAmount || isGameFinished || !pickedStars.length ? "_hidden" : ''}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83401 0.439639C6.09948 -0.146547 6.90052 -0.146546 7.16599 0.43964L8.55758 3.51234C8.6646 3.74867 8.87989 3.91196 9.12877 3.9456L12.3576 4.38201C12.9725 4.46511 13.2194 5.25373 12.7698 5.6981L10.3976 8.04239C10.2165 8.22134 10.1348 8.48364 10.1807 8.73915L10.7824 12.0908C10.8966 12.7268 10.2492 13.2149 9.70432 12.9035L6.85435 11.2746C6.63366 11.1485 6.36635 11.1485 6.14565 11.2746L3.29568 12.9035C2.75084 13.2149 2.10336 12.7268 2.21756 12.0908C2.39945 11.0631 2.53616 10.1778 2.78159 9.58162C3.47699 8.517 7.19942 7.11169 7.0318 6.88987C7.0767 6.68584 2.69978 7.70788 1.96348 7.28203L1.55442 7.02652L0.230238 5.6981C-0.21942 5.25373 0.0275324 4.46511 0.642364 4.38201L3.87123 3.9456C4.12011 3.91196 4.3354 3.74867 4.44243 3.51234L5.83401 0.439639Z" fill="white"/>
                    </svg>
                    {betAmount ? betAmount * betMultiply - pickedStars.length * betAmount : ''}
                </span>
            </div>
        </BoxWrapper>
    );
};

export default Game;