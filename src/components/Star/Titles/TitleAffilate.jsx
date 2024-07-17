import React from "react";
import airdropCoin from '../../../assets/img/icons/airdrop_coin.svg';
import qrCodeImg from '../../../assets/img/qrcode.png';
import { useApp } from "../../../hooks/useApp";
import { useTelegram } from "../../../hooks/useTelegram";
import { useGetReferralQuery } from "../../../store/services/starsGame";
import BoxWrapper from "../../Wrappers/BoxWrapper";

const telegramId = 658318611

const TitleAffilate= ({}) => {
    const {
        referralsCount,
        ref: refHash
    } = useApp()

    const { sendAlert, user: tgUser } = useTelegram()
    const {data: refData, isLoading: isRefDataLoading, refetch: refetchRefQuery} = useGetReferralQuery(tgUser|telegramId)

    const copyRefLink = () => {
        navigator.clipboard.writeText(`https://t.me/gl_pl_bot/starsdevapp?startapp=${refHash}`).then(() => {
            sendAlert('Реферальная ссылка скопирована');
        /* Resolved - text copied to clipboard successfully */
        },() => {
            sendAlert('Failed to copy');
        /* Rejected - text failed to copy to the clipboard */
        });
    }
    return (
        <div className='title-affilate'>
            <div className="intro-star-topper__subtitle">Affiliate program</div>
            <div className="title-affilate__percent">Your cut 50%</div>
            <div className="title-affilate__text">
                To know how this program works and how to increase your cut up to 
                <span>50%</span> 
                please 
                <div>read this rules</div>.
            </div>
            <BoxWrapper className={'title-affilate__qr'}>
                <img src={qrCodeImg} alt="qrCode" />
                <strong>https://t.me/gl_pl_bot/starsdevapp?startapp={refHash}</strong>
                <div className="title-affilate__qr-row">
                    <div className="title-affilate__qr-copy" onClick={copyRefLink}>
                        <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="5.33781" width="12.9599" height="10.8659" rx="2.5" stroke="black"/>
                            <path d="M15.4 12C16.8359 12 18 10.8412 18 9.41176V3.58824C18 2.15879 16.8359 1 15.4 1H7.6C6.16406 1 5 2.15879 5 3.58824" stroke="black"/>
                        </svg>
                        Copy
                    </div>
                    <div className="title-affilate__qr-share">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.4615 8.76564V9.68161C13.4615 11.9299 11.9626 13.4288 9.71431 13.4288H5.21773C2.96944 13.4288 1.47058 11.9299 1.47058 9.68161V8.76564" stroke="black" strokeLinecap="square" strokeLinejoin="round"/>
                            <path d="M4.33191 4.35401L7.07249 1.61343C7.275 1.41092 7.60275 1.41092 7.8046 1.61343L10.5452 4.35401" stroke="black" strokeLinecap="square" strokeLinejoin="round"/>
                            <path d="M7.43365 2.10403L7.43832 9.30256" stroke="black" strokeLinecap="square" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </BoxWrapper>
            <div className="title-affilate__row">
                <div>
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15 5C15 7.76167 12.7617 10 10 10C7.23833 10 5 7.76167 5 5C5 2.23833 7.23833 0 10 0C12.7617 0 15 2.23833 15 5Z" fill="#2CAFFD"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 18.3333C20 12.81 15.5233 10 10 10C4.47667 10 0 12.81 0 18.3333C0 25 20 25 20 18.3333Z" fill="#2CAFFD"/>
                    </svg>
                    {referralsCount.toLocaleString()}
                </div>
                <div>
                    <img src={airdropCoin} alt="airdrop" />
                    {Math.floor(refData?.totals?.add_sum).toLocaleString()}
                </div>
                <div>
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83401 0.405821C6.09948 -0.135274 6.90052 -0.135273 7.16599 0.405821L8.55758 3.24216C8.6646 3.46031 8.87989 3.61104 9.12877 3.64209L12.3576 4.04493C12.9725 4.12164 13.2194 4.8496 12.7698 5.25978L10.3976 7.42374C10.2165 7.58893 10.1348 7.83105 10.1807 8.06691L10.7824 11.1607C10.8966 11.7479 10.2492 12.1984 9.70432 11.911L6.85435 10.4073C6.63366 10.2909 6.36635 10.2909 6.14565 10.4073L3.29568 11.911C2.75084 12.1984 2.10336 11.7478 2.21756 11.1607C2.39945 10.2121 2.53616 9.3949 2.78159 8.84457C3.47699 7.86184 7.19942 6.56464 7.0318 6.35988C7.0767 6.17155 2.69978 7.11497 1.96348 6.72188L1.55442 6.48602L0.230238 5.25978C-0.21942 4.8496 0.0275324 4.12164 0.642364 4.04493L3.87123 3.64209C4.12011 3.61104 4.3354 3.46031 4.44243 3.24216L5.83401 0.405821Z" fill="#31B545"/>
                    </svg>
                    {Math.floor(refData?.totals?.game_sum).toLocaleString()}
                </div>
            </div>
        </div>
    )
};

export default TitleAffilate
