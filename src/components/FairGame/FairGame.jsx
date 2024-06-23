import React from 'react';
import BoxWrapper from '../Wrappers/BoxWrapper';
import { useStarGame } from '../../hooks/useStarGame';

const FairGame = ({

}) => {
    const {
        resultNumber,
        isGameFinished
    } = useStarGame()
    return (
        <div className='fair-game'>
            <div className="fair-game__title">FAIR GAME</div>
            <BoxWrapper className={'hash-box'}>
                <div className={"hash-box__inner" + (isGameFinished ? ' _result' : '')} data-winnum={isGameFinished ? resultNumber : '?'}>
                    <div className="hash-box__hash">
                        <span>WIN NUMBER HASH</span>
                        <p>ED1F1EF53144DB...FCF08376143E7</p>
                    </div>
                    <div className={"hash-box__details"}>
                        {isGameFinished
                            ?
                            <p>Win number: {resultNumber} <span>Check it</span></p>
                            :
                            <p>Number of the Lucky Star has been encrypted into the hash above. <span>See details</span></p>
                        }
                    </div>
                </div>
            </BoxWrapper>

            <BoxWrapper className={'box-btn'} linkPath={'/history'}>
                <div className="box-btn__img _grey">
                    <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.75 7H4.75" stroke="black" strokeLinecap="square" strokeLinejoin="round"/>
                        <path d="M15.75 13H4.75" stroke="black" strokeLinecap="square" strokeLinejoin="round"/>
                        <path d="M15.75 1H4.75" stroke="black" strokeLinecap="square" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M2 1C2 1.5525 1.5525 2 1 2C0.4475 2 0 1.5525 0 1C0 0.4475 0.4475 0 1 0C1.5525 0 2 0.4475 2 1Z" fill="black"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M2 7C2 7.5525 1.5525 8 1 8C0.4475 8 0 7.5525 0 7C0 6.4475 0.4475 6 1 6C1.5525 6 2 6.4475 2 7Z" fill="black"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M2 13C2 13.5525 1.5525 14 1 14C0.4475 14 0 13.5525 0 13C0 12.4475 0.4475 12 1 12C1.5525 12 2 12.4475 2 13Z" fill="black"/>
                    </svg>
                </div>
                <div className="box-btn__text">History</div>
            </BoxWrapper>

            <BoxWrapper className={'box-btn'} linkPath={'/affilate'}>
                <div className="box-btn__img _orange">20%</div>
                <div className="box-btn__text">Affiliate program</div>
                <div className="box-btn__subinfo">
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10 4C10 5.657 8.657 7 7 7C5.343 7 4 5.657 4 4C4 2.343 5.343 1 7 1C8.657 1 10 2.343 10 4Z" stroke="#8F8BA2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M13 12C13 8.686 10.314 7 7 7C3.686 7 1 8.686 1 12C1 16 13 16 13 12Z" stroke="#8F8BA2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {348}
                </div>
            </BoxWrapper>
        </div>
    );
};

export default FairGame;