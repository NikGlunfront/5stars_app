import React, { useEffect, useState } from 'react';
import starImageDef from '../../assets/img/logo/5s_logo.png'
import starImageGreen from '../../assets/img/logo/5s_logo_green.png'
import Modal from '../UI/Modal/Modal';
import { useLocation, useNavigate } from 'react-router-dom';
import TitleAffilate from './Titles/TitleAffilate';
import TitleHistory from './Titles/TitleHistory';
import { useApp } from '../../hooks/useApp';
import greenCoin from '../../assets/img/icons/airdrop_coin.svg'
import eyeLogo from '../../assets/img/logo/5s_eye_big_logo.png'
import TitleAddStars from './Titles/TitleAddStars';
 
const Star = ({

}) => {
    const [isModalActive, setIsModalActive] = useState(false)
    const [isShareActive, setIsShareActive] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { isLoaded } = useApp()

    useEffect(() => {
        if (location.pathname === '/') {
            setIsShareActive(true)
        } else {
            setIsShareActive(false)
        }
    }, [location])

    const navigateToAddStars = () => {
        setIsModalActive(false)
        navigate('/add-stars')
    }
    const navigateToWithDraw = () => {
        setIsModalActive(false)
        navigate('/withdraw')
    }

    const openModal = () => {
        setIsModalActive(true)
    }
    

    return (
        <div className='star-topper'>
            <div className="star-topper__actions">
                {isShareActive
                    ?
                        <div className="star-topper__share">
                            53
                        </div>

                    :
                        <div className="star-topper__return" onClick={() => navigate('/')}>Back</div>
                }
                <div 
                    className={
                        "star-topper__balance" +
                        (location.pathname.includes('history') ? ' _airdrop' : '') +
                        (location.pathname.includes('affilate') ? ' _affilate' : '')
                    } 
                    onClick={openModal}
                >
                    <span>
                        500
                        <svg width="2" height="12" viewBox="0 0 2 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.7 11.6757C1.5 11.8919 1.26667 12 1 12C0.733333 12 0.5 11.8919 0.3 11.6757C0.1 11.4595 0 11.2073 0 10.9191C0 10.6308 0.1 10.3786 0.3 10.1624C0.5 9.94623 0.733333 9.83814 1 9.83814C1.26667 9.83814 1.5 9.94623 1.7 10.1624C1.9 10.3786 2 10.6308 2 10.9191C2 11.2073 1.9 11.4595 1.7 11.6757Z" fill="black"/>
                            <path d="M1.7 6.75665C1.5 6.97284 1.26667 7.08093 1 7.08093C0.733333 7.08093 0.5 6.97284 0.3 6.75665C0.1 6.54046 0 6.28825 0 6C0 5.71175 0.1 5.45954 0.3 5.24335C0.5 5.02716 0.733333 4.91907 1 4.91907C1.26667 4.91907 1.5 5.02716 1.7 5.24335C1.9 5.45954 2 5.71175 2 6C2 6.28825 1.9 6.54046 1.7 6.75665Z" fill="black"/>
                            <path d="M1.7 1.83758C1.5 2.05376 1.26667 2.16186 1 2.16186C0.733333 2.16186 0.5 2.05376 0.3 1.83758C0.1 1.62139 0 1.36918 0 1.08093C0 0.792681 0.1 0.540465 0.3 0.324279C0.5 0.108093 0.733333 0 1 0C1.26667 0 1.5 0.108093 1.7 0.324279C1.9 0.540465 2 0.792681 2 1.08093C2 1.36918 1.9 1.62139 1.7 1.83758Z" fill="black"/>
                        </svg>
                    </span>
                </div>
                <Modal
                    className={'balance-popup'}
                    isActive={isModalActive}
                    setActive={setIsModalActive}
                >
                    <ul>
                        <li onClick={navigateToAddStars}><div>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.7886 13.7886C16.3272 11.2499 16.3272 7.13482 13.7886 4.59618C11.2499 2.05755 7.13482 2.05755 4.59619 4.59618C2.05756 7.13482 2.05756 11.2499 4.59619 13.7886C7.13482 16.3272 11.2499 16.3272 13.7886 13.7886Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7.14969 11.2351H11.2352V7.1496" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.7244 10.7245L4.59614 4.59622" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        Add stars
                        </div></li>
                        <li onClick={navigateToWithDraw}><div>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.7886 4.59622C16.3272 7.13486 16.3272 11.25 13.7886 13.7886C11.2499 16.3272 7.13482 16.3272 4.59619 13.7886C2.05756 11.25 2.05756 7.13486 4.59619 4.59622C7.13482 2.05759 11.2499 2.05759 13.7886 4.59622Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7.14969 7.14969H11.2352V11.2352" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.7244 7.66031L4.59614 13.7886" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        Withdraw
                        </div></li>
                        <li onClick={() => setIsModalActive(false)}><div>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.692383 12.0257V2.02571C0.692383 1.28905 1.28905 0.692383 2.02571 0.692383H8.80703C9.16037 0.692383 9.4997 0.833049 9.7497 1.08305L12.3017 3.63504C12.5517 3.88504 12.6924 4.22438 12.6924 4.57771V12.0257C12.6924 12.7624 12.0957 13.359 11.359 13.359H2.02571C1.28905 13.359 0.692383 12.7624 0.692383 12.0257Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12.6925 4.69243H10.6925C9.9558 4.69243 9.35913 4.09576 9.35913 3.3591V1.3591" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4.02563 4.69243H6.02563" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4.02563 7.35903H8.69229" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4.02563 10.0257H8.69229" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        Rules
                        </div></li>
                    </ul>
                </Modal>
            </div>
            {!location.pathname.includes('/check-win-num') &&
                <div className={"intro-star-topper" + (isShareActive ? ' _home' : '')}>
                    {location.pathname.includes('history') &&
                        <>
                            <img src={eyeLogo} alt="5star" />
                            <TitleHistory />
                        </>
                    }
                    {location.pathname.includes('affilate') &&
                        <>
                            <img src={starImageGreen} alt="5star" />
                            <TitleAffilate />
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
            
        </div>
    );
};

export default Star;