import React, { useEffect, useState } from 'react';
import BoxWrapper from '../Wrappers/BoxWrapper';
import { useStarGame } from '../../hooks/useStarGame';
import greenCoin from '../../assets/img/icons/airdrop_coin.svg'
import { useApp } from '../../hooks/useApp';
import greenPartnership from '../../assets/img/icons/green_partnership.svg'
import premiumPartnership from '../../assets/img/icons/purple_partner.svg'
import tokenList from '../../assets/img/icons/tokenlist.svg'
import tokenListCount from '../../assets/img/icons/token_list_count.svg'
import { useCalculateGameMutation } from '../../store/services/starsGame';
import { useTelegram } from '../../hooks/useTelegram';

const FairGame = ({

}) => {
    const {
        tg,
        user,
        queryId
    } = useTelegram()
    const [isVisibleDebug, setIsVisibleDebug] = useState(false)
    const {
        resultNumber,
        isGameFinished,
        hash_1,
        hash_2,
        gameResult,
        game_id,
        pickedStars,
        betAmount
    } = useStarGame()
    
    const [hash2String, setHash2String] = useState('')
    const [hash1String, setHash1String] = useState('')

    const {
        airdropBalance,
        partnershipBalance,
        isPremium
    } = useApp()

    useEffect(() => {
        if (hash_2 === null) {
            return
        }
        const firstSub = hash_2.slice(0, 13)
        const lastSub = hash_2.slice(-15, -1)
        setHash2String(firstSub + "..." + lastSub)
    }, [hash_2])

    useEffect(() => {
        if (hash_1 === null) {
            return
        }
        const firstSub = hash_1.slice(0, 13)
        const lastSub = hash_1.slice(-15, -1)
        setHash1String(firstSub + "..." + lastSub)
    }, [hash_1])

    return (
        <div className='fair-game'>
            <div className="fair-game__title">FAIR GAME</div>
            {/* <BoxWrapper className={'hash-box'} linkPath={isGameFinished ? '/check-win-num' : null}> */}
            <BoxWrapper className={'hash-box'}>
                <div className={"hash-box__inner" + (isGameFinished ? ' _result' : '')} data-winnum={isGameFinished ? resultNumber : '?'}>
                    <div className="hash-box__hash">
                        <span>WIN NUMBER HASH</span>
                        <p>{isGameFinished ? hash1String : hash2String}</p>
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
                <svg width="31" height="27" viewBox="0 0 31 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.153 0.15263C6.95468 1.13601 2.02262 5.54582 0.47586 11.4874C-0.0774319 13.6129 -0.155167 16.2583 0.279075 18.1838C0.53017 19.297 0.635983 19.6833 0.854508 20.2839C1.69307 22.5889 2.74879 24.2405 4.48897 25.9699C5.46423 26.9391 5.4664 26.9407 5.84601 26.9407C6.15919 26.9407 6.26749 26.8998 6.46067 26.709C6.64855 26.5233 6.69516 26.4083 6.69516 26.1296C6.69516 25.7966 6.66219 25.7487 5.91299 24.9929C4.9115 23.9827 4.74079 23.7863 4.19696 23.0179C2.28078 20.3104 1.41935 16.8796 1.83827 13.6241C2.18724 10.9125 3.18544 8.67586 5.03761 6.45518C6.85311 4.27865 9.77432 2.56191 12.6444 1.98491C16.1609 1.27802 19.6615 1.89259 22.6995 3.75039C24.9588 5.13191 26.9263 7.35773 27.9977 9.74395C28.8329 11.6044 29.1692 13.2008 29.166 15.2913C29.1626 17.5796 28.7243 19.4282 27.7288 21.3537C26.9747 22.8123 26.1148 23.956 24.8986 25.118C24.2625 25.7256 24.1514 25.9142 24.219 26.2706C24.2729 26.5538 24.6315 26.9094 24.9405 26.9861C25.2695 27.0677 25.7226 26.7936 26.4273 26.0865C27.7346 24.7748 28.9031 23.1473 29.4838 21.8292C29.5799 21.6113 29.7226 21.2903 29.801 21.116C30.6993 19.1192 31.2073 15.8142 30.9193 13.8405C30.7089 12.3981 30.6561 12.1121 30.4642 11.3772C29.0944 6.13027 24.7753 1.86834 19.4104 0.469858C17.5891 -0.00491369 14.9799 -0.137178 13.153 0.15263ZM14.5168 4.35956C11.7703 4.6489 9.47999 5.71224 7.61771 7.56282C6.02338 9.14714 5.0409 10.9454 4.56109 13.1574C4.35749 14.0961 4.35813 16.4894 4.56221 17.3913C4.89955 18.882 5.55841 20.3707 6.42096 21.5915C6.63651 21.8966 7.15643 22.4939 7.57632 22.919C8.32792 23.6799 8.34557 23.6918 8.71627 23.6917C9.16006 23.6915 9.46587 23.4753 9.5773 23.083C9.66626 22.7699 9.43731 22.2633 9.09957 22.0257C8.83524 21.8398 7.939 20.7866 7.61907 20.286C6.57819 18.6572 6.08234 16.8604 6.15903 14.9954C6.20789 13.8058 6.2861 13.3576 6.61855 12.3609C7.07292 10.999 7.76372 9.89579 8.84567 8.804C10.1927 7.44491 11.6184 6.67636 13.6745 6.20088C14.5077 6.00823 16.5747 6.0347 17.485 6.24969C20.3919 6.93629 22.6379 8.69995 23.9027 11.2893C24.6242 12.7661 24.786 13.5101 24.7818 15.3309C24.7787 16.6611 24.7101 17.1272 24.367 18.1442C23.905 19.5134 23.1893 20.6802 22.1759 21.7159C21.417 22.4915 21.3758 22.5546 21.3758 22.9395C21.3758 23.3791 21.727 23.6915 22.2212 23.6915C22.582 23.6915 22.624 23.6662 23.2382 23.0773C24.7168 21.6599 25.8487 19.6757 26.3008 17.7083C27.3247 13.2533 25.4863 8.76762 21.5488 6.11347C21.0939 5.80686 19.7918 5.17573 19.1697 4.96034C17.6829 4.44539 15.8943 4.21446 14.5168 4.35956ZM14.5168 8.37147C13.138 8.67697 12.4503 8.94546 11.5897 9.51406C8.48443 11.5659 7.56854 15.6102 9.4864 18.8024C9.97367 19.6134 10.8884 20.5586 11.2527 20.6277C11.9436 20.7587 12.5313 20.0516 12.218 19.4664C12.1671 19.3712 11.8866 19.0398 11.5946 18.7301C9.94255 16.9772 9.75844 14.2825 11.1561 12.312C12.287 10.7179 14.2073 9.86924 16.1136 10.1212C18.2019 10.3972 19.8509 11.7959 20.5124 13.8524C20.6433 14.2592 20.6817 14.5796 20.6804 15.2517C20.6773 16.7935 20.2743 17.7547 19.1111 18.9941C18.7246 19.406 18.6482 19.5347 18.6482 19.7743C18.6482 20.1855 18.8694 20.5095 19.2213 20.6136C19.6568 20.7425 19.9154 20.64 20.4181 20.1394C21.3091 19.252 21.9372 18.1811 22.2797 16.9654C22.5241 16.098 22.5192 14.4091 22.2697 13.5082C21.4127 10.4136 18.5918 8.28612 15.3993 8.32669C15.0022 8.33176 14.6051 8.35189 14.5168 8.37147ZM14.3965 12.1453C13.709 12.4167 13.4977 12.5526 13.0848 12.9887C12.2579 13.862 11.9854 15.1092 12.3653 16.2819C12.5955 16.9922 13.2812 17.7918 13.732 17.8753C14.2837 17.9775 14.7174 17.5952 14.7174 17.0065C14.7174 16.8074 14.6377 16.6389 14.425 16.3885C14.2641 16.1991 14.0836 15.9294 14.0238 15.7891C13.7616 15.1739 14.0026 14.3964 14.5834 13.9837C14.8789 13.7737 14.9834 13.746 15.4795 13.746C15.9745 13.746 16.0812 13.7741 16.3803 13.9837C16.761 14.2506 16.969 14.6107 17.0248 15.1004C17.0754 15.5442 16.947 15.8917 16.5623 16.3515C16.3237 16.6368 16.2416 16.8057 16.2416 17.0113C16.2416 17.5835 16.7483 18.0272 17.2507 17.8948C17.7931 17.7518 18.456 16.8456 18.6965 15.9181C18.9842 14.8087 18.5501 13.5279 17.6054 12.6987C17.3824 12.503 16.7486 12.1799 16.3299 12.0485C15.8611 11.9013 14.8914 11.9499 14.3965 12.1453Z" fill="#1773E6"/>
                </svg>

                </div>
                <div className="box-btn__text">Airdrop</div>
                <div className="box-btn__subinfo">
                    {airdropBalance}
                    <img src={greenCoin} alt="" />

                </div>
            </BoxWrapper>
            <BoxWrapper className={'box-btn'}>
                <div className="box-btn__img _orange" onClick={() => setIsVisibleDebug(!isVisibleDebug)}>
                    <img src={tokenList} alt="tokenlist" />
                </div>
                <div className="box-btn__text">Tokenlist</div>
                <div className="box-btn__subinfo">
                    {1}
                    <img src={tokenListCount} alt="tokenlist_count" />

                </div>
            </BoxWrapper>

            <BoxWrapper className={'box-btn'} linkPath={'/affilate'}>
                <div className={"box-btn__img _green" + (isPremium ? ' _purple' : '')}>
                    <img src={isPremium ? premiumPartnership : greenPartnership} alt="" />
                </div>
                <div className="box-btn__text">{isPremium ? "Premium Partner" : "Partnership"}</div>
                <div className={"box-btn__subinfo" + (348 === 0 ? " _empty" : '')}>
                    {348}
                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.5 6.5C8.29508 6.5 9.75 5.04508 9.75 3.25C9.75 1.45492 8.29508 0 6.5 0C4.70492 0 3.25 1.45492 3.25 3.25C3.25 5.04508 4.70492 6.5 6.5 6.5ZM6.5 6.5C2.90983 6.5 0 8.3265 0 11.9167C0 16.25 13 16.25 13 11.9167C13 8.3265 10.0902 6.5 6.5 6.5Z" fill="#2CAFFD"/>
                    </svg>
                </div>
            </BoxWrapper>
            <BoxWrapper className={'box-btn'} >
                <p>TG</p>
                <pre>{tg.initData}</pre>
                <p>User</p>
                <pre>{user}</pre>
            </BoxWrapper>
        </div>
    );
};

export default FairGame;