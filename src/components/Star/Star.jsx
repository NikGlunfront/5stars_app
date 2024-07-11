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
 
const Star = ({

}) => {
    const [isModalActive, setIsModalActive] = useState(false)
    const [isShareActive, setIsShareActive] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { isLoaded, mainBalance, isPremium, airdropBalance, partnershipBalance, gamesLeft, activePartnerBalance } = useApp()

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
                    {location.pathname === '/' &&
                        <>
                            <img src={isLoaded ? starImageDef : eyeLogo} alt="5star" />
                            <p>Airdrop: <span>Lucky Star Token (LST)</span></p>
                        </>
                    }
                    {!isLoaded && location.pathname === '/' &&
                        <div className="intro-star-topper__title">
                            <span>5</span>
                            <span>STARS</span>
                            <p>Lucky Game</p>
                        </div>
                    }
                </div>
            }
            <div className="star-topper__actions">
                {isShareActive
                    ?
                        <div className="star-topper__share">
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
                        ((location.pathname.includes('affilate') || location.pathname.includes('withdraw')) && activePartnerBalance === 'coin' ? ' _affilate_coin' : '') +
                        ((location.pathname.includes('affilate') || location.pathname.includes('withdraw')) && isPremium ? ' _affilate_premium' : '')
                    } 
                    onClick={openModal}
                >
                    <span>
                        {(location.pathname === '/' || location.pathname.includes('add-stars') || location.pathname.includes('check-win-num')) && mainBalance}
                        {location.pathname.includes('history') && airdropBalance}
                        {(location.pathname.includes('affilate') || location.pathname.includes('withdraw')) && activePartnerBalance === 'star' && partnershipBalance}
                        {location.pathname.includes('affilate') && activePartnerBalance === 'coin' && airdropBalance}
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
                {location.pathname.includes('affilate') &&
                    <PartnerModal 
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