import {Navigate} from "react-router-dom";
import LoginPages from "../pages/LoginPage/LoginPages";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import PostList from "../components/PostList";
import Main from "../components/Main";


export const routes = () => {

    return [
        {
            path: '/',
            element: <Main/>
        },
        {
            path: 'auth/sign-in',
            element: <LoginPages/>,
        },
        {
            path: 'auth/sign-up',
            element: <SignUpPage/>,
        },
        {
            path: 'post-list',
            element: <PostList/>,
            authOnly: true,
            roles: ['admin','user'],
        },
        {
            path: '*',
            element: <Navigate to='/404'/>,
        }
    ]
}