import React from "react"
import BoxWrapper from "../../Wrappers/BoxWrapper";
import qrCodeImg from '../../../assets/img/qrcode.png'
import airdropCoin from '../../../assets/img/icons/airdrop_coin.svg';
import { useTelegram } from "../../../hooks/useTelegram";
import { useGetReferralQuery } from "../../../store/services/starsGame";
import { useApp } from "../../../hooks/useApp";

const TitleAffilatePremium= ({}) => {
    const {
        referralsCount,
        ref: refHash
    } = useApp()
    const {user: tgUser, sendAlert} = useTelegram()
    const {data: refData, isLoading: isRefDataLoading, refetch: refetchRefQuery} = useGetReferralQuery(tgUser)

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
            <div className="intro-star-topper__subtitle">Premium partner</div>
            <div className="title-affilate__text">
                Share this link and get 50% from any income of the service.
                To know how it works please
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
                    {Math.floor(refData?.totals?.game_sum).toLocaleString()}
                </div>
                <div>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11.2418" cy="10.7582" r="10.7582" fill="#28A07D"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.1444 6.83203V8.03769H14.3513H12.5583V8.80431V9.57086L13.0066 9.6108C15.2489 9.81069 16.5251 10.0769 17.2432 10.4943C17.533 10.6628 17.6282 10.7943 17.6282 11.0259C17.6282 11.6055 15.7234 12.1844 13.2693 12.3506L12.5892 12.3966L12.5731 14.9161L12.5569 17.4357H11.2592H9.96149V14.9297C9.96149 12.9778 9.94442 12.4188 9.8842 12.4017C9.84172 12.3896 9.40348 12.3492 8.9104 12.312C7.024 12.1695 5.47414 11.7718 5.06125 11.3244C4.84479 11.0897 4.82451 10.9849 4.95441 10.7713C5.26597 10.259 7.02289 9.8089 9.48231 9.61136L9.96149 9.57284V8.8053V8.03769H8.16845H6.37542V6.83203V5.62637H11.2599H16.1444V6.83203ZM6.20719 10.3305C6.93466 10.0894 7.67215 9.96681 9.3432 9.80909C9.46222 9.79789 9.64925 9.78423 9.75887 9.77879L9.95809 9.7689L9.97528 10.65L9.9924 11.531H11.2599H12.5274L12.5446 10.6448L12.5618 9.7587L13.0392 9.79919C16.0274 10.053 17.424 10.5259 16.8837 11.101C16.6914 11.3057 16.2202 11.4718 15.3222 11.6516C14.143 11.8875 13.1747 11.9613 11.2599 11.9613C8.06736 11.9613 5.79009 11.565 5.51514 10.9616C5.45411 10.8277 5.46821 10.7889 5.63422 10.6338C5.73778 10.5371 5.99561 10.4005 6.20719 10.3305Z" fill="white"/>
                    </svg>
                    {(parseFloat(refData?.totals?.add_sum ? refData?.totals?.add_sum : 0)).toFixed(2).toLocaleString()}
                </div>
            </div>
        </div>
    )
};

export default TitleAffilatePremium
