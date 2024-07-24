import React, { useEffect, useState } from 'react';
import Game from '../../components/Game/Game';
import FairGame from '../../components/FairGame/FairGame';
import { useApp } from '../../hooks/useApp';
import { useLocation } from 'react-router-dom';
import { useScroll } from '../../hooks/useScroll';
import { useTelegram } from '../../hooks/useTelegram';
import { useSelector } from 'react-redux';
import AddStars from '../AddStars/AddStars';
import AddStarsGamePrize from '../AddStars/AddStarsGamePrize';
import Modal from '../../components/UI/Modal/Modal';
import RequestButton from '../../components/UI/RequestButton/RequestButton';
import { useAddStarsMutation, useGetBonusQuery, useLazyAddStarsQuery } from "../../store/services/starsGame";

const Home = ({

}) => {

    const {
        setIsWithDraw,
        isLoaded,
        mainBalance
    } = useApp()


    const { isVisibleBonus } = useSelector(state => state.addStar)
    const [isModalActive, setIsModalActive] = useState(false)
    const { hideTgButton, user: tgUser } = useTelegram()
    const { scrollTop } = useScroll()
    const location = useLocation()
    const {data: bonusData, isLoading: isBonusDataLoading, refetch: refetchBonus} = useGetBonusQuery(tgUser)
    
    useEffect(() => {
        scrollTop()
    }, [location.pathname])
    
    useEffect(() => {
        hideTgButton()
        setIsWithDraw(false)
    }, [])
    
    useEffect(() => {
        if (mainBalance < 10) {
            setIsModalActive(true)
        } else {
            setIsModalActive(false)
        }
    }, [mainBalance])

    useEffect(() => {
        if (bonusData && !isBonusDataLoading && isModalActive) {
            setIsModalActive(false)
        }
    }, [bonusData, isBonusDataLoading])

    const handleAddStarsClickModal = () => {
        refetchBonus()
    }


    return (
        <div className='homepage'>
            {isLoaded &&
                <div className="s5-app__content">
                    {<AddStarsGamePrize />}
                    {(mainBalance < 10) && <AddStars />}
                    {(mainBalance >= 10) && <Game />}
                
                    <Modal 
                        isActive={isModalActive}
                        setActive={() => {}}
                        className={'addstars-modal'}
                    >
                        <p>Your balance is low</p>
                        <RequestButton
                            onClick={handleAddStarsClickModal}
                            isloading={isBonusDataLoading}
                        >
                            Add stars
                        </RequestButton>
                    </Modal>
                    <FairGame />
                </div>
            }
        </div>
    );
};

export default Home;