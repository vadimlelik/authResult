import {Navigate} from "react-router-dom";
import LoginPages from "../pages/LoginPages";
import AuthLayout from "../layout/AuthLayout";
import SignUp from "../pages/SignUp";
import PostLayout from "../layout/PostLayout";
import PostList from "../components/PostList";


export const routes = (isLoggedIn) => {
    return [
        {
            path: '/',
            element: <h1>Home Page</h1>,
        },
        {
            path: 'auth',
            element: <AuthLayout/>,
            children: [
                {
                    path: '',
                    element: <Navigate to='/auth/signUp'/>,
                },
                {
                    path: "login",
                    element: <LoginPages/>

                },
                {
                    path: "signUp",
                    element: <SignUp/>,
                }

            ]
        },
        {
            path: 'post',
            element: isLoggedIn ? (<PostLayout/>) : (<Navigate to='auth/signUp'/>),
            children: [
                {
                    path: '',
                    element: <PostList/>
                },
                {
                    path: ':postId',
                    element: <h1>PostPage</h1>
                }
            ]
        },
        {
            path: '*',
            element: <Navigate to='/404'/>,
        }
    ]
}