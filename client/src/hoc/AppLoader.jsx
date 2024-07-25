import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {fetchUsers} from '../store/usersSlice'
import {fetchRole} from '../store/roleSlice'
import {authMe} from "../store/authSlice";
import {fetchQuality, isLoadingQuality} from "../store/qualitySlice";
import {Navigate} from "react-router-dom";

const AppLoader = ({children}) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const userStatusLoading = useSelector((state) => state.users.isLoading)
    const user = useSelector((state) => state.auth.user)
    const isAuthLoading = useSelector(state => state.auth.isLoading)
    const isLoadingQualitiesList = useSelector(isLoadingQuality)


    useEffect(() => {
        dispatch(fetchQuality())

        if (isLoggedIn) {
            dispatch(authMe())
            dispatch(fetchUsers())
            dispatch(fetchRole())
        }
    }, [isLoggedIn, dispatch])

    if (isLoadingQualitiesList) {
        return <h1>Loading</h1>
    }

    return children
}

export default AppLoader
