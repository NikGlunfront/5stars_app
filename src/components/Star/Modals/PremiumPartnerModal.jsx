import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../UI/Modal/Modal';
import { useApp } from '../../../hooks/useApp';
import usdt from '../../../assets/img/icons/usdt.svg'
import coinImg from '../../../assets/img/icons/airdrop_coin.svg'
import { useChangePpMutation } from '../../../store/services/starsGame';
import { useTelegram } from '../../../hooks/useTelegram';

const PremiumPartnerModal = ({
    isModalActive,
    setIsModalActive
}) => {
    const navigate = useNavigate()
    const {
        activePartnerBalance,
        partnershipBalanceAirdrop,
        partnershipBalanceUsdt,
        changeActivePartnerBalance
    } = useApp()

    const { tg: tgUser, sendAlert } = useTelegram()
    const { changeIsPremium, isPremium } = useApp()

    const [changePremium, {data, isLoading}] = useChangePpMutation()
    
    const navigateToWithDraw = () => {
        console.log('Withdraw')
    }
    const changeBalance = () => {
        if (activePartnerBalance === 'usdt') {
            changeActivePartnerBalance('coin')
        } else {
            changeActivePartnerBalance('usdt')
        }
        setIsModalActive(false)
    }

    const handleChangePremium = async () => {
        await changePremium({
            tg_id: tgUser | 658318611
        })

        navigate('/')
        window.location.reload();

        sendAlert('Партнерская программа изменена.')
    }

    return (
        <Modal
            className={'balance-popup'}
            isActive={isModalActive}
            setActive={setIsModalActive}
        >
            <ul>
                <li className='balance-popup__balance'>
                    {activePartnerBalance === 'usdt' && 
                        <div>
                            <img src={usdt} alt="" />
                            {partnershipBalanceUsdt}
                        </div>
                    }
                    {activePartnerBalance === 'coin' && 
                        <div>
                            <img src={coinImg} alt="" />
                            {partnershipBalanceAirdrop}
                        </div>
                    }
                </li>
                <li onClick={handleChangePremium}>
                    <div>Change partnership</div>
                </li>
                <li onClick={changeBalance}><div>Change Balance</div></li>
                {/* <li onClick={navigateToWithDraw}><div>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.7886 4.59622C16.3272 7.13486 16.3272 11.25 13.7886 13.7886C11.2499 16.3272 7.13482 16.3272 4.59619 13.7886C2.05756 11.25 2.05756 7.13486 4.59619 4.59622C7.13482 2.05759 11.2499 2.05759 13.7886 4.59622Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.14969 7.14969H11.2352V11.2352" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.7244 7.66031L4.59614 13.7886" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    Withdraw
                </div></li> */}
                <li onClick={() => setIsModalActive(false)}><div>
                    Connect TON Space
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
    );
};

export default PremiumPartnerModal;