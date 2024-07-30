import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {fetchUsers} from '../store/usersSlice'
import {fetchRole} from '../store/roleSlice'
import {authMe} from "../store/authSlice";
import {fetchQuality, isLoadingQuality} from "../store/qualitySlice";
import {fetchPost} from "../store/postSilce";

const AppLoader = ({children}) => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const isLoadingQualitiesList = useSelector(isLoadingQuality)

    useEffect(() => {
        dispatch(fetchQuality())
        if (isLoggedIn) {
            dispatch(authMe())
            dispatch(fetchUsers())
            dispatch(fetchRole())
            dispatch(fetchPost())
        }
    }, [isLoggedIn, dispatch])

    if (isLoadingQualitiesList) {
        return <h1>Loading</h1>
    }

    return children
}

export default AppLoader
