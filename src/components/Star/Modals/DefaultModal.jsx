import React from 'react';
import { useTelegram } from '../../../hooks/useTelegram';
import { useCreatePrizeGameMutation, useResetDataMutation, useSetZeroBalanceMutation } from '../../../store/services/starsGame';
import Modal from '../../UI/Modal/Modal';
import { useSelector } from 'react-redux';

const prizes = [
    {id: 1, value: 50},
    {id: 2, value: 100},
    {id: 3, value: 150},
    {id: 4, value: 200},
    {id: 5, value: 250},
]

const DefaultModal = ({
    isModalActive,
    setIsModalActive
}) => {
    const { prizeId } = useSelector(state => state.addStar)
    const [resetUserData, {data, isLoading}] = useResetDataMutation()
    const {user: tgUser, sendAlert} = useTelegram()
    const [createUserPrize, {data: prizeData, isLoading: isPrizeDataLoading}] = useCreatePrizeGameMutation()
    const [nulifyBalance, {data: zeroBalanceData, isLoading: isZeroBalanceDataLoading}] = useSetZeroBalanceMutation()

    const shufflePrizes = () => {
        let newArr = [...prizes]
        for (let i = newArr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }

        return newArr;
    }

    const handleResetUserData = async () => {
        await resetUserData({
            tg_id: tgUser | 658318611,
        })
        setIsModalActive(false)
        sendAlert('Данные пользователя были очищены')
    }

    const createPrize = async () => {
        await createUserPrize({
            picked_star: 0,
            tg_id: tgUser | 658318611,
            prizes: [...shufflePrizes()]
        })
        setIsModalActive(false)
    }
    const setZeroBalance = async () => {
        await nulifyBalance({
            tg_id: tgUser | 658318611,
        })
        setIsModalActive(false)
    }
    return (
        <Modal
            className={'balance-popup'}
            isActive={isModalActive}
            setActive={setIsModalActive}
        >
            <ul>
                {/* <li onClick={navigateToAddStars}><div>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.7886 13.7886C16.3272 11.2499 16.3272 7.13482 13.7886 4.59618C11.2499 2.05755 7.13482 2.05755 4.59619 4.59618C2.05756 7.13482 2.05756 11.2499 4.59619 13.7886C7.13482 16.3272 11.2499 16.3272 13.7886 13.7886Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.14969 11.2351H11.2352V7.1496" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.7244 10.7245L4.59614 4.59622" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                Add stars
                </div></li> */}
                {/* <li onClick={navigateToWithDraw}><div>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.7886 4.59622C16.3272 7.13486 16.3272 11.25 13.7886 13.7886C11.2499 16.3272 7.13482 16.3272 4.59619 13.7886C2.05756 11.25 2.05756 7.13486 4.59619 4.59622C7.13482 2.05759 11.2499 2.05759 13.7886 4.59622Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.14969 7.14969H11.2352V11.2352" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.7244 7.66031L4.59614 13.7886" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                Withdraw
                </div></li> */}
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
                <li onClick={handleResetUserData}><div>RESET</div></li>
                <li onClick={setZeroBalance}><div>Zero Balance</div></li>
                {!prizeId && <li onClick={createPrize}><div>Get prize</div></li>}
            </ul>
        </Modal>
    );
};

export default DefaultModal;