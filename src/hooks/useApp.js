import { useDispatch, useSelector } from "react-redux";
import { setIsApplicationLoaded } from "../store/slices/appSlice/appSlice";

export function useApp() {
    const dispatch = useDispatch()
    const { isLoaded } = useSelector(state => state.app)

    const setIsAppLoaded = (isLoaded) => {
        dispatch(setIsApplicationLoaded(isLoaded))
    }

    return {
        setIsAppLoaded,
        isLoaded
    }
}