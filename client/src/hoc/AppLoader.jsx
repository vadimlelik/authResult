import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUsers} from "../store/usersSlice";


const AppLoader = ({children}) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userStatusLoading = useSelector((state) => state.users.isLoading);

    useEffect(() => {

        if (isLoggedIn) {
            dispatch(fetchUsers())
        }

    }, [isLoggedIn, dispatch]);

    if (userStatusLoading) {
        return <div>Loading...</div>;
    }

    return children
}

export default AppLoader;