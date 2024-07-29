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
import TriesGame from '../Tries/TriesGame';
import TriesGamePrize from '../Tries/TriesGamePrize';

const Home = ({

}) => {

    const {
        setIsWithDraw,
        isLoaded,
        mainBalance,
        gamesLeft
    } = useApp()


    const { isVisibleBonus } = useSelector(state => state.addStar)
    const [isModalActive, setIsModalActive] = useState(false)
    const [isGamesLeftModalActive, setIsGamesLeftModalActive] = useState(false)
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
        if (gamesLeft === 0) {
            setIsGamesLeftModalActive(true)
        } else {
            setIsGamesLeftModalActive(false)
        }
    }, [gamesLeft])

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
                    <TriesGame />
                    <TriesGamePrize />
                    {(mainBalance < 10) && <AddStars />}
                    {(mainBalance >= 10 && gamesLeft !== 0) && <Game />}
                
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
                    <Modal 
                        isActive={isGamesLeftModalActive}
                        setActive={() => {}}
                        className={'addstars-modal'}
                    >
                        <p>No tries left.</p>
                        <RequestButton
                            onClick={() => setIsGamesLeftModalActive(false)}
                            isloading={false}
                        >
                            Add tries
                        </RequestButton>
                    </Modal>
                    <FairGame />
                </div>
            }
        </div>
    );
};

export default Home;