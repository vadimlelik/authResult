import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {retry} from "@reduxjs/toolkit/query";

const AuthLayout = () => {

    // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    //
    // if (isLoggedIn) {
    //     return <Navigate to='/'/>
    // }
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default AuthLayout