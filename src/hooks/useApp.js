import { useDispatch, useSelector } from "react-redux";
import { setIsApplicationLoaded, setIsWithdrawPage } from "../store/slices/appSlice/appSlice";

export function useApp() {
    const dispatch = useDispatch()
    const { 
        isLoaded, 
        isWithdrawPage 
    } = useSelector(state => state.app)

    const setIsAppLoaded = (isLoaded) => {
        dispatch(setIsApplicationLoaded(isLoaded))
    }

    const setIsWithDraw = (isTrue) => {
        dispatch(setIsWithdrawPage(isTrue))
    }

    return {
        setIsAppLoaded,
        setIsWithDraw,
        isLoaded,
        isWithdrawPage
    }
}