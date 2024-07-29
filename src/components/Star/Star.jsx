import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import eyeLogo from '../../assets/img/logo/5s_eye_big_logo.png';
import starImageDef from '../../assets/img/logo/5s_logo.png';
import starImageGreen from '../../assets/img/logo/5s_logo_green.png';
import starImagePremium from '../../assets/img/logo/5s_premium.png';
import { useApp } from '../../hooks/useApp';
import AirdropModal from './Modals/AirdropModal';
import DefaultModal from './Modals/DefaultModal';
import greenPartnerShip from '../../assets/img/logo/green_logo.png';
import TitleAddStars from './Titles/TitleAddStars';
import TitleAffilate from './Titles/TitleAffilate';
import TitleHistory from './Titles/TitleHistory';
import TitleAffilatePremium from './Titles/TitleAffilatePremium';
import PartnerModal from './Modals/PartnerModal';
import PremiumPartnerModal from './Modals/PremiumPartnerModal';
import { useStarGame } from '../../hooks/useStarGame';
 
const Star = ({

}) => {
    const [isModalActive, setIsModalActive] = useState(false)
    const [isShareActive, setIsShareActive] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const {pickedStars, isGameFinished, betAmount} = useStarGame()
    const { isLoaded, mainBalance, isPremium, airdropBalance, partnershipBalance, gamesLeft, activePartnerBalance, partnershipBalanceAirdrop, partnershipBalanceUsdt, changeActivePartnerBalance, isMainBalanceLoading } = useApp()

    useEffect(() => {
        if (isPremium) {
            changeActivePartnerBalance('usdt')
        } else {
            changeActivePartnerBalance('star')
        }
    }, [isPremium])

    useEffect(() => {
        if (location.pathname === '/') {
            setIsShareActive(true)
        } else {
            setIsShareActive(false)
        }
    }, [location])

    const openModal = () => {
        setIsModalActive(true)
    }
    

    return (
        <div className='star-topper'>
            {!location.pathname.includes('/check-win-num') &&
                <div className={"intro-star-topper" + (isShareActive ? ' _home' : '')}>
                    {location.pathname.includes('history') &&
                        <>
                            <img src={starImageDef} alt="5star" />
                            <TitleHistory />
                        </>
                    }
                    {location.pathname.includes('affilate') && !isPremium &&
                        <>
                            <img src={greenPartnerShip} alt="5star" />
                            <TitleAffilate />
                        </>
                    }
                    {location.pathname.includes('affilate') && isPremium &&
                        <>
                            <img src={starImagePremium} alt="5star" />
                            <TitleAffilatePremium />
                        </>
                    }
                    {location.pathname.includes('/add-stars') &&
                        <>
                            <img src={eyeLogo} alt="5star" />
                            <TitleAddStars />
                        </>
                    }
                    {location.pathname === '/' && !isLoaded &&
                        <>
                            <img src={eyeLogo} alt="5star" />
                            <p>Airdrop: <span>Lucky Star Token (LST)</span></p>
                        </>
                    }
                    {location.pathname === '/' && isLoaded &&
                        <>
                            <img src={starImageDef} alt="5star" />
                            <p style={{fontWeight: "500"}}>Airdrop: <span>Lucky Star Token (LST)</span></p>
                        </>
                    }
                </div>
            }
            <div className="star-topper__actions">
                {isShareActive
                    ?
                        <div className="star-topper__share">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#1773E6"/>
                                <path d="M7.81902 3.19792L7.81902 4.53159C7.81902 4.70477 7.95505 4.83814 8.1269 4.85805C9.6437 5.03388 10.7737 6.49296 10.4014 8.11858C10.1818 9.07671 9.40484 9.85501 8.44738 10.076C6.71227 10.4761 5.16495 9.1623 5.16495 7.49421L6.90078 7.49421C7.03481 7.49421 7.15624 7.41326 7.20733 7.28918C7.25842 7.1651 7.22989 7.02311 7.13501 6.92756L4.40389 4.09831C4.2745 3.96892 4.06417 3.96892 3.93478 4.09831L1.09671 6.92756C1.00249 7.02311 0.973955 7.1651 1.02505 7.28918C1.07614 7.41326 1.19756 7.49421 1.33159 7.49421L3.17439 7.49421C3.17439 10.078 5.29433 12.1753 7.8867 12.1382C10.351 12.103 12.4265 10.0289 12.4637 7.56454C12.5008 5.08895 10.5899 3.04266 8.16804 2.86218C7.97893 2.84824 7.81902 3.00815 7.81902 3.19792Z" fill="white"/>
                            </svg>
                            {gamesLeft}
                        </div>

                    :
                        <div className="star-topper__return" onClick={() => navigate(-1)}>Back</div>
                }
                <div 
                    className={
                        "star-topper__balance" +
                        (location.pathname.includes('history') ? ' _airdrop' : '') +
                        ((location.pathname.includes('affilate') || location.pathname.includes('withdraw')) && !isPremium ? ' _affilate' : '') +
                        ((location.pathname.includes('affilate') || location.pathname.includes('withdraw')) && isPremium ? ' _affilate_premium' : '') +
                        ((location.pathname.includes('affilate') || location.pathname.includes('withdraw')) && activePartnerBalance === 'coin' ? ' _affilate_coin' : '')
                    } 
                    onClick={openModal}
                >
                    <span>
                        {(location.pathname === '/' || location.pathname.includes('add-stars') || location.pathname.includes('check-win-num')) && !isMainBalanceLoading && (!isGameFinished && pickedStars.length && !isMainBalanceLoading ? (mainBalance - pickedStars.length * betAmount).toLocaleString() : mainBalance.toLocaleString())}
                        {location.pathname.includes('history') && airdropBalance}
                        {(location.pathname.includes('affilate') || location.pathname.includes('withdraw')) && activePartnerBalance === 'star' && partnershipBalance.toLocaleString()}
                        {(location.pathname.includes('affilate') || location.pathname.includes('withdraw')) && activePartnerBalance === 'usdt' && partnershipBalanceUsdt.toLocaleString()}
                        {location.pathname.includes('affilate') && activePartnerBalance === 'coin' && partnershipBalanceAirdrop.toLocaleString()}
                        <svg width="2" height="12" viewBox="0 0 2 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.7 11.6757C1.5 11.8919 1.26667 12 1 12C0.733333 12 0.5 11.8919 0.3 11.6757C0.1 11.4595 0 11.2073 0 10.9191C0 10.6308 0.1 10.3786 0.3 10.1624C0.5 9.94623 0.733333 9.83814 1 9.83814C1.26667 9.83814 1.5 9.94623 1.7 10.1624C1.9 10.3786 2 10.6308 2 10.9191C2 11.2073 1.9 11.4595 1.7 11.6757Z" fill="black"/>
                            <path d="M1.7 6.75665C1.5 6.97284 1.26667 7.08093 1 7.08093C0.733333 7.08093 0.5 6.97284 0.3 6.75665C0.1 6.54046 0 6.28825 0 6C0 5.71175 0.1 5.45954 0.3 5.24335C0.5 5.02716 0.733333 4.91907 1 4.91907C1.26667 4.91907 1.5 5.02716 1.7 5.24335C1.9 5.45954 2 5.71175 2 6C2 6.28825 1.9 6.54046 1.7 6.75665Z" fill="black"/>
                            <path d="M1.7 1.83758C1.5 2.05376 1.26667 2.16186 1 2.16186C0.733333 2.16186 0.5 2.05376 0.3 1.83758C0.1 1.62139 0 1.36918 0 1.08093C0 0.792681 0.1 0.540465 0.3 0.324279C0.5 0.108093 0.733333 0 1 0C1.26667 0 1.5 0.108093 1.7 0.324279C1.9 0.540465 2 0.792681 2 1.08093C2 1.36918 1.9 1.62139 1.7 1.83758Z" fill="black"/>
                        </svg>
                    </span>
                </div>
                {location.pathname.includes('history') &&
                    
                    <AirdropModal 
                        isModalActive={isModalActive}
                        setIsModalActive={setIsModalActive}
                    />
                }
                {location.pathname.includes('affilate') && !isPremium &&
                    <PartnerModal 
                        isModalActive={isModalActive}
                        setIsModalActive={setIsModalActive}
                    />
                }
                {location.pathname.includes('affilate') && isPremium &&
                    <PremiumPartnerModal 
                        isModalActive={isModalActive}
                        setIsModalActive={setIsModalActive}
                    />
                }
                {!location.pathname.includes('affilate') && !location.pathname.includes('history') &&
                    <DefaultModal 
                        isModalActive={isModalActive}
                        setIsModalActive={setIsModalActive}
                    />
                }
            </div>
            
            
        </div>
    );
};

export default Star;